import type { AccessControl } from "~/crud/AccessControl/AccessControl";
import { filterAsync } from "~/utils/filterAsync";
import type { IGetLatestEntriesByIds } from "../../abstractions";
import type { CmsEntryStorageOperationsGetLatestByIdsParams, CmsModel } from "~/types";

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
