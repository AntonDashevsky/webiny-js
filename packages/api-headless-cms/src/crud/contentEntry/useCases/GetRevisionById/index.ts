import { GetRevisionById } from "./GetRevisionById.js";
import { GetRevisionByIdNotDeleted } from "./GetRevisionByIdNotDeleted.js";
import { type CmsEntryStorageOperations } from "~/types/index.js";

interface GetRevisionByIdUseCasesParams {
    operation: CmsEntryStorageOperations["getRevisionById"];
}

export const getRevisionByIdUseCases = (params: GetRevisionByIdUseCasesParams) => {
    const getRevisionById = new GetRevisionById(params.operation);
    const getRevisionByIdNotDeleted = new GetRevisionByIdNotDeleted(getRevisionById);

    return {
        getRevisionByIdUseCase: getRevisionByIdNotDeleted
    };
};
