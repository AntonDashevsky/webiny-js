import { GetPageByPath } from "./GetPageByPath.js";
import type { WbPagesStorageOperations } from "~/context/pages/pages.types.js";

interface GetPageByPathUseCasesParams {
    getOperation: WbPagesStorageOperations["get"];
}

export const getGetPageByPathUseCase = (params: GetPageByPathUseCasesParams) => {
    const getPageByPathUseCase = new GetPageByPath(params.getOperation);

    return {
        getPageByPathUseCase
    };
};
