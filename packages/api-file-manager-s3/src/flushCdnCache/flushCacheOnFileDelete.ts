import { ContextPlugin } from "@webiny/api";
import { type FileManagerContext, type OnFileBeforeUpdateTopicParams } from "@webiny/api-file-manager/types.js";
import { CdnPathsGenerator } from "~/flushCdnCache/CdnPathsGenerator.js";

class FlushCacheOnFileDelete {
    private readonly context: FileManagerContext;
    private readonly pathsGenerator: CdnPathsGenerator;

    constructor(context: FileManagerContext) {
        this.pathsGenerator = new CdnPathsGenerator();
        this.context = context;
        context.fileManager.onFileAfterDelete.subscribe(this.onFileAfterDelete);
    }

    private onFileAfterDelete = async ({ file }: OnFileBeforeUpdateTopicParams) => {
        await this.context.tasks.trigger({
            definition: "cloudfrontInvalidateCache",
            input: {
                caller: "fm-before-delete",
                paths: this.pathsGenerator.generate(file)
            }
        });
    };
}

export const flushCacheOnFileDelete = () => {
    return new ContextPlugin<FileManagerContext>(context => {
        new FlushCacheOnFileDelete(context);
    });
};
