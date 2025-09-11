import { GetPublishedEntriesByIds } from "./GetPublishedEntriesByIds.js";
import { GetPublishedEntriesByIdsNotDeleted } from "./GetPublishedEntriesByIdsNotDeleted.js";
import { GetPublishedEntriesByIdsSecure } from "./GetPublishedEntriesByIdsSecure.js";
import type { CmsEntryStorageOperations } from "~/types/index.js";
import type { AccessControl } from "~/crud/AccessControl/AccessControl.js";
import type { ITransformEntryCallable } from "~/utils/entryStorage.js";

interface GetPublishedEntriesByIdsUseCasesParams {
    operation: CmsEntryStorageOperations["getPublishedByIds"];
    accessControl: AccessControl;
    transform: ITransformEntryCallable;
}

export const getPublishedEntriesByIdsUseCases = (
    params: GetPublishedEntriesByIdsUseCasesParams
) => {
    const getPublishedEntriesByIds = new GetPublishedEntriesByIds(
        params.operation,
        params.transform
    );
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
