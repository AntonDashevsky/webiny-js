import { GetRevisionById } from "./GetRevisionById.js";
import { GetRevisionByIdNotDeleted } from "./GetRevisionByIdNotDeleted.js";
import type { CmsEntryStorageOperations } from "~/types/index.js";
import type { ITransformEntryCallable } from "~/utils/entryStorage.js";

interface GetRevisionByIdUseCasesParams {
    operation: CmsEntryStorageOperations["getRevisionById"];
    transform: ITransformEntryCallable;
}

export const getRevisionByIdUseCases = (params: GetRevisionByIdUseCasesParams) => {
    const getRevisionById = new GetRevisionById(params.operation, params.transform);
    const getRevisionByIdNotDeleted = new GetRevisionByIdNotDeleted(getRevisionById);

    return {
        getRevisionByIdUseCase: getRevisionByIdNotDeleted
    };
};
