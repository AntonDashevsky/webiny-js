import { GetPublishedRevisionByEntryId } from "./GetPublishedRevisionByEntryId.js";
import { GetPublishedRevisionByEntryIdNotDeleted } from "./GetPublishedRevisionByEntryIdNotDeleted.js";
import { CmsEntryStorageOperations } from "~/types/index.js";

interface GetPublishedRevisionByEntryIdUseCasesParams {
    operation: CmsEntryStorageOperations["getPublishedRevisionByEntryId"];
}

export const getPublishedRevisionByEntryIdUseCases = (
    params: GetPublishedRevisionByEntryIdUseCasesParams
) => {
    const getPublishedRevisionByEntryId = new GetPublishedRevisionByEntryId(params.operation);
    const getPublishedRevisionByEntryIdNotDeleted = new GetPublishedRevisionByEntryIdNotDeleted(
        getPublishedRevisionByEntryId
    );

    return {
        getPublishedRevisionByEntryIdUseCase: getPublishedRevisionByEntryIdNotDeleted
    };
};
