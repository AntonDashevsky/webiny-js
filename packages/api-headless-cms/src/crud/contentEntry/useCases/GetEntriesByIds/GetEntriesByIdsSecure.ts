import type { AccessControl } from "~/crud/AccessControl/AccessControl.js";
import { filterAsync } from "~/utils/filterAsync.js";
import type { IGetEntriesByIds } from "../../abstractions/index.js";
import type { CmsEntryStorageOperationsGetByIdsParams, CmsModel } from "~/types/index.js";

export class GetEntriesByIdsSecure implements IGetEntriesByIds {
    private accessControl: AccessControl;
    private getEntriesByIds: IGetEntriesByIds;

    constructor(accessControl: AccessControl, getEntriesByIds: IGetEntriesByIds) {
        this.accessControl = accessControl;
        this.getEntriesByIds = getEntriesByIds;
    }

    async execute(model: CmsModel, params: CmsEntryStorageOperationsGetByIdsParams) {
        await this.accessControl.ensureCanAccessEntry({ model });

        const entries = await this.getEntriesByIds.execute(model, params);

        return filterAsync(entries, async entry => {
            return this.accessControl.canAccessEntry({ model, entry });
        });
    }
}
