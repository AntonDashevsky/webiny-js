import type { CmsModel } from "@webiny/api-headless-cms/types";
import type { IProcessEntry } from "~/abstractions";
import type { HcmsBulkActionsContext } from "~/types";

class PublishEntry implements IProcessEntry {
    private readonly context: HcmsBulkActionsContext;

    constructor(context: HcmsBulkActionsContext) {
        this.context = context;
    }

    async execute(model: CmsModel, id: string): Promise<void> {
        await this.context.cms.publishEntry(model, id);
    }
}

export const createPublishEntry = (context: HcmsBulkActionsContext) => {
    return new PublishEntry(context);
};
