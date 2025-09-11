import { GetPublishedRevisionByEntryId } from "./GetPublishedRevisionByEntryId.js";
import { GetPublishedRevisionByEntryIdNotDeleted } from "./GetPublishedRevisionByEntryIdNotDeleted.js";
import type { CmsEntryStorageOperations } from "~/types/index.js";
import type { ITransformEntryCallable } from "~/utils/entryStorage.js";

interface GetPublishedRevisionByEntryIdUseCasesParams {
    operation: CmsEntryStorageOperations["getPublishedRevisionByEntryId"];
    transform: ITransformEntryCallable;
}

export const getPublishedRevisionByEntryIdUseCases = (
    params: GetPublishedRevisionByEntryIdUseCasesParams
) => {
    const getPublishedRevisionByEntryId = new GetPublishedRevisionByEntryId(
        params.operation,
        params.transform
    );
    const getPublishedRevisionByEntryIdNotDeleted = new GetPublishedRevisionByEntryIdNotDeleted(
        getPublishedRevisionByEntryId
    );

    return {
        getPublishedRevisionByEntryIdUseCase: getPublishedRevisionByEntryIdNotDeleted
    };
};
