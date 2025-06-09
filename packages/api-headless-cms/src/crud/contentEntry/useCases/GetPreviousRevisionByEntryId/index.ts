import { GetPreviousRevisionByEntryId } from "./GetPreviousRevisionByEntryId.js";
import { GetPreviousRevisionByEntryIdNotDeleted } from "./GetPreviousRevisionByEntryIdNotDeleted.js";
import { type CmsEntryStorageOperations } from "~/types/index.js";

interface GetPreviousRevisionByEntryIdUseCasesParams {
    operation: CmsEntryStorageOperations["getPreviousRevision"];
}

export const getPreviousRevisionByEntryIdUseCases = (
    params: GetPreviousRevisionByEntryIdUseCasesParams
) => {
    const getPreviousRevisionByEntryId = new GetPreviousRevisionByEntryId(params.operation);
    const getPreviousRevisionByEntryIdNotDeleted = new GetPreviousRevisionByEntryIdNotDeleted(
        getPreviousRevisionByEntryId
    );

    return {
        getPreviousRevisionByEntryIdUseCase: getPreviousRevisionByEntryIdNotDeleted
    };
};
