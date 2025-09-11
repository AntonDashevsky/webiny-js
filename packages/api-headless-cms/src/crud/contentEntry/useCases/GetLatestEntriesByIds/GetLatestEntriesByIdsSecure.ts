import type { AccessControl } from "~/crud/AccessControl/AccessControl.js";
import { filterAsync } from "~/utils/filterAsync.js";
import type { IGetLatestEntriesByIds } from "../../abstractions/index.js";
import type { CmsEntryStorageOperationsGetLatestByIdsParams, CmsModel } from "~/types/index.js";

export class GetLatestEntriesByIdsSecure implements IGetLatestEntriesByIds {
    private accessControl: AccessControl;
    private getLatestEntriesByIds: IGetLatestEntriesByIds;

    constructor(accessControl: AccessControl, getLatestEntriesByIds: IGetLatestEntriesByIds) {
        this.accessControl = accessControl;
        this.getLatestEntriesByIds = getLatestEntriesByIds;
    }

    async execute(model: CmsModel, params: CmsEntryStorageOperationsGetLatestByIdsParams) {
        await this.accessControl.ensureCanAccessEntry({ model });

        const entries = await this.getLatestEntriesByIds.execute(model, params);

        return filterAsync(entries, async entry => {
            return this.accessControl.canAccessEntry({ model, entry });
        });
    }
}
