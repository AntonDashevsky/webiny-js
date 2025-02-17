import { GetPublishedEntriesByIds } from "./GetPublishedEntriesByIds.js";
import { GetPublishedEntriesByIdsNotDeleted } from "./GetPublishedEntriesByIdsNotDeleted.js";
import { GetPublishedEntriesByIdsSecure } from "./GetPublishedEntriesByIdsSecure.js";
import { CmsEntryStorageOperations } from "~/types/index.js";
import { AccessControl } from "~/crud/AccessControl/AccessControl.js";

interface GetPublishedEntriesByIdsUseCasesParams {
    operation: CmsEntryStorageOperations["getPublishedByIds"];
    accessControl: AccessControl;
}

export const getPublishedEntriesByIdsUseCases = (
    params: GetPublishedEntriesByIdsUseCasesParams
) => {
    const getPublishedEntriesByIds = new GetPublishedEntriesByIds(params.operation);
    const getPublishedEntriesByIdsSecure = new GetPublishedEntriesByIdsSecure(
        params.accessControl,
        getPublishedEntriesByIds
    );
    const getPublishedEntriesByIdsNotDeleted = new GetPublishedEntriesByIdsNotDeleted(
        getPublishedEntriesByIdsSecure
    );

    return {
        getPublishedEntriesByIdsUseCase: getPublishedEntriesByIdsNotDeleted
    };
};
