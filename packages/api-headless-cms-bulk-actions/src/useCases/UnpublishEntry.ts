import { CmsModel } from "@webiny/api-headless-cms/types/index.js";
import { IProcessEntry } from "~/abstractions/index.js";
import { HcmsBulkActionsContext } from "~/types.js";

class UnpublishEntry implements IProcessEntry {
    private readonly context: HcmsBulkActionsContext;

    constructor(context: HcmsBulkActionsContext) {
        this.context = context;
    }

    async execute(model: CmsModel, id: string): Promise<void> {
        await this.context.cms.unpublishEntry(model, id);
    }
}

export const createUnpublishEntry = (context: HcmsBulkActionsContext) => {
    return new UnpublishEntry(context);
};
