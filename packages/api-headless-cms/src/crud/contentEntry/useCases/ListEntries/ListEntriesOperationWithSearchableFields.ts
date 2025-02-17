import { IListEntriesOperation } from "../../abstractions/index.js";
import { CmsContext, CmsEntryStorageOperationsListParams, CmsModel } from "~/types/index.js";
import { getSearchableFields } from "~/crud/contentEntry/searchableFields.js";

export class ListEntriesOperationWithSearchableFields implements IListEntriesOperation {
    private context: CmsContext;
    private listEntries: IListEntriesOperation;

    constructor(context: CmsContext, listEntries: IListEntriesOperation) {
        this.context = context;
        this.listEntries = listEntries;
    }

    async execute(model: CmsModel, params: CmsEntryStorageOperationsListParams) {
        const fields = getSearchableFields({
            fields: model.fields,
            plugins: this.context.plugins,
            input: params.fields || []
        });

        return await this.listEntries.execute(model, { ...params, fields });
    }
}
