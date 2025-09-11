import { GetRevisionsByEntryId } from "./GetRevisionsByEntryId.js";
import { GetRevisionsByEntryIdNotDeleted } from "./GetRevisionsByEntryIdNotDeleted.js";
import type { CmsEntryStorageOperations } from "~/types/index.js";
import type { AccessControl } from "~/crud/AccessControl/AccessControl.js";
import type { ITransformEntryCallable } from "~/utils/entryStorage.js";

interface GetRevisionsByEntryIdUseCasesParams {
    operation: CmsEntryStorageOperations["getRevisions"];
    accessControl: AccessControl;
    transform: ITransformEntryCallable;
}

export const getRevisionsByEntryIdUseCases = (params: GetRevisionsByEntryIdUseCasesParams) => {
    const getRevisionsByEntryId = new GetRevisionsByEntryId(params.operation, params.transform);
    const getRevisionsByEntryIdNotDeleted = new GetRevisionsByEntryIdNotDeleted(
        getRevisionsByEntryId
    );

    return {
        getRevisionsByEntryIdUseCase: getRevisionsByEntryIdNotDeleted
    };
};
