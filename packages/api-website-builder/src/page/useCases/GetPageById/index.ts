import { GetPageById } from "./GetPageById";
import type { WbPagesStorageOperations } from "~/page/page.types";

interface GetPageByIdUseCasesParams {
    getOperation: WbPagesStorageOperations["getById"];
}

export const getGetPageByIdUseCase = (params: GetPageByIdUseCasesParams) => {
    const getPageByIdUseCase = new GetPageById(params.getOperation);

    return {
        getPageByIdUseCase
    };
};
