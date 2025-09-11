import { GetPageById } from "./GetPageById.js";
import type { WbPagesStorageOperations } from "~/context/pages/pages.types.js";

interface GetPageByIdUseCasesParams {
    getOperation: WbPagesStorageOperations["getById"];
}

export const getGetPageByIdUseCase = (params: GetPageByIdUseCasesParams) => {
    const getPageByIdUseCase = new GetPageById(params.getOperation);

    return {
        getPageByIdUseCase
    };
};
