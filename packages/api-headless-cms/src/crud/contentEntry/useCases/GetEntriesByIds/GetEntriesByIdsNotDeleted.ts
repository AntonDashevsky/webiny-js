import { type IGetEntriesByIds } from "../../abstractions/index.js";
import { type CmsEntryStorageOperationsGetByIdsParams, type CmsModel } from "~/types/index.js";

export class GetEntriesByIdsNotDeleted implements IGetEntriesByIds {
    private getEntriesByIds: IGetEntriesByIds;

    constructor(getEntriesByIds: IGetEntriesByIds) {
        this.getEntriesByIds = getEntriesByIds;
    }

    async execute(model: CmsModel, params: CmsEntryStorageOperationsGetByIdsParams) {
        const entries = await this.getEntriesByIds.execute(model, params);
        return entries.filter(entry => !entry.wbyDeleted);
    }
}
