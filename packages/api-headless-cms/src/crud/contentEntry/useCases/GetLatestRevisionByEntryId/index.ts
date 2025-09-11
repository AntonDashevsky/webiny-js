import { GetLatestRevisionByEntryId } from "./GetLatestRevisionByEntryId.js";
import { GetLatestRevisionByEntryIdDeleted } from "./GetLatestRevisionByEntryIdDeleted.js";
import { GetLatestRevisionByEntryIdNotDeleted } from "./GetLatestRevisionByEntryIdNotDeleted.js";
import type { CmsEntryStorageOperations } from "~/types/index.js";
import type { ITransformEntryCallable } from "~/utils/entryStorage.js";

interface GetLatestRevisionByEntryIdUseCasesParams {
    operation: CmsEntryStorageOperations["getLatestRevisionByEntryId"];
    transform: ITransformEntryCallable;
}

export const getLatestRevisionByEntryIdUseCases = (
    params: GetLatestRevisionByEntryIdUseCasesParams
) => {
    const getLatestRevisionByEntryId = new GetLatestRevisionByEntryId(
        params.operation,
        params.transform
    );
    const getLatestRevisionByEntryIdNotDeleted = new GetLatestRevisionByEntryIdNotDeleted(
        getLatestRevisionByEntryId
    );
    const getLatestRevisionByEntryIdDeleted = new GetLatestRevisionByEntryIdDeleted(
        getLatestRevisionByEntryId
    );

    return {
        getLatestRevisionByEntryIdUseCase: getLatestRevisionByEntryIdNotDeleted,
        getLatestRevisionByEntryIdWithDeletedUseCase: getLatestRevisionByEntryId,
        getLatestRevisionByEntryIdDeletedUseCase: getLatestRevisionByEntryIdDeleted
    };
};
