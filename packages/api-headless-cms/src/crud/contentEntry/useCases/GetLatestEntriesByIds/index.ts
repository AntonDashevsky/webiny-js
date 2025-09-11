import { GetLatestEntriesByIds } from "./GetLatestEntriesByIds.js";
import { GetLatestEntriesByIdsNotDeleted } from "./GetLatestEntriesByIdsNotDeleted.js";
import { GetLatestEntriesByIdsSecure } from "./GetLatestEntriesByIdsSecure.js";
import type { CmsEntryStorageOperations } from "~/types/index.js";
import type { AccessControl } from "~/crud/AccessControl/AccessControl.js";
import type { ITransformEntryCallable } from "~/utils/entryStorage.js";

interface GetLatestEntriesByIdsUseCasesParams {
    operation: CmsEntryStorageOperations["getLatestByIds"];
    accessControl: AccessControl;
    transform: ITransformEntryCallable;
}

export const getLatestEntriesByIdsUseCases = (params: GetLatestEntriesByIdsUseCasesParams) => {
    const getLatestEntriesByIds = new GetLatestEntriesByIds(params.operation, params.transform);
    const getLatestEntriesByIdsSecure = new GetLatestEntriesByIdsSecure(
        params.accessControl,
        getLatestEntriesByIds
    );
    const getLatestEntriesByIdsNotDeleted = new GetLatestEntriesByIdsNotDeleted(
        getLatestEntriesByIdsSecure
    );

    return {
        getLatestEntriesByIdsUseCase: getLatestEntriesByIdsNotDeleted
    };
};
