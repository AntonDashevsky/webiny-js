import { GetEntriesByIds } from "./GetEntriesByIds.js";
import { GetEntriesByIdsSecure } from "./GetEntriesByIdsSecure.js";
import { GetEntriesByIdsNotDeleted } from "./GetEntriesByIdsNotDeleted.js";
import { type AccessControl } from "~/crud/AccessControl/AccessControl.js";
import { type CmsEntryStorageOperations } from "~/types/index.js";

interface GetEntriesByIdsUseCasesParams {
    operation: CmsEntryStorageOperations["getByIds"];
    accessControl: AccessControl;
}

export const getEntriesByIdsUseCases = (params: GetEntriesByIdsUseCasesParams) => {
    const getEntriesByIds = new GetEntriesByIds(params.operation);
    const getEntriesByIdsSecure = new GetEntriesByIdsSecure(params.accessControl, getEntriesByIds);
    const getEntriesByIdsNotDeleted = new GetEntriesByIdsNotDeleted(getEntriesByIdsSecure);

    return {
        getEntriesByIdsUseCase: getEntriesByIdsNotDeleted
    };
};
