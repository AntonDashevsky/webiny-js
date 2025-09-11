import type { IGetLatestEntriesByIds } from "../../abstractions/index.js";
import type { CmsEntryStorageOperationsGetLatestByIdsParams, CmsModel } from "~/types/index.js";

export class GetLatestEntriesByIdsNotDeleted implements IGetLatestEntriesByIds {
    private getLatestEntriesByIds: IGetLatestEntriesByIds;

    constructor(getLatestEntriesByIds: IGetLatestEntriesByIds) {
        this.getLatestEntriesByIds = getLatestEntriesByIds;
    }

    async execute(model: CmsModel, params: CmsEntryStorageOperationsGetLatestByIdsParams) {
        const entries = await this.getLatestEntriesByIds.execute(model, params);
        return entries.filter(entry => !entry.wbyDeleted);
    }
}
