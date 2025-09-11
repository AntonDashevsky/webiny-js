import type { AccessControl } from "~/crud/AccessControl/AccessControl.js";
import { filterAsync } from "~/utils/filterAsync.js";
import type { IGetPublishedEntriesByIds } from "../../abstractions/index.js";
import type { CmsEntryStorageOperationsGetPublishedByIdsParams, CmsModel } from "~/types/index.js";

export class GetPublishedEntriesByIdsSecure implements IGetPublishedEntriesByIds {
    private accessControl: AccessControl;
    private getPublishedEntriesByIds: IGetPublishedEntriesByIds;

    constructor(accessControl: AccessControl, getPublishedEntriesByIds: IGetPublishedEntriesByIds) {
        this.accessControl = accessControl;
        this.getPublishedEntriesByIds = getPublishedEntriesByIds;
    }

    async execute(model: CmsModel, params: CmsEntryStorageOperationsGetPublishedByIdsParams) {
        await this.accessControl.ensureCanAccessEntry({ model });

        const entries = await this.getPublishedEntriesByIds.execute(model, params);

        return filterAsync(entries, async entry => {
            return this.accessControl.canAccessEntry({ model, entry });
        });
    }
}
