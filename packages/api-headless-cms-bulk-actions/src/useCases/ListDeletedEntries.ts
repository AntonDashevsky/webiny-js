import { CmsEntryListParams } from "@webiny/api-headless-cms/types/index.js";
import { IListEntries } from "~/abstractions/index.js";
import { HcmsBulkActionsContext } from "~/types.js";

class ListDeletedEntries implements IListEntries {
    private readonly context: HcmsBulkActionsContext;

    constructor(context: HcmsBulkActionsContext) {
        this.context = context;
    }

    async execute(modelId: string, params: CmsEntryListParams) {
        const model = await this.context.cms.getModel(modelId);

        if (!model) {
            throw new Error(`Model with ${modelId} not found!`);
        }

        const [entries, meta] = await this.context.cms.listDeletedEntries(model, params);

        return {
            entries,
            meta
        };
    }
}

export const createListDeletedEntries = (context: HcmsBulkActionsContext) => {
    return new ListDeletedEntries(context);
};
