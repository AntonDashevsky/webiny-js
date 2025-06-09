import { GetLatestRevisionByEntryId } from "./GetLatestRevisionByEntryId.js";
import { GetLatestRevisionByEntryIdDeleted } from "./GetLatestRevisionByEntryIdDeleted.js";
import { GetLatestRevisionByEntryIdNotDeleted } from "./GetLatestRevisionByEntryIdNotDeleted.js";
import { type CmsEntryStorageOperations } from "~/types/index.js";

interface GetLatestRevisionByEntryIdUseCasesParams {
    operation: CmsEntryStorageOperations["getLatestRevisionByEntryId"];
}

export const getLatestRevisionByEntryIdUseCases = (
    params: GetLatestRevisionByEntryIdUseCasesParams
) => {
    const getLatestRevisionByEntryId = new GetLatestRevisionByEntryId(params.operation);
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
