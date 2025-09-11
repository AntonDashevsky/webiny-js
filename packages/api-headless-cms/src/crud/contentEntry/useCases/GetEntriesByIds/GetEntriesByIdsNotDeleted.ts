import type { IGetEntriesByIds } from "../../abstractions";
import type { CmsEntryStorageOperationsGetByIdsParams, CmsModel } from "~/types";

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
