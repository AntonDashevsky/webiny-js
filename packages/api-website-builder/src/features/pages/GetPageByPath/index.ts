import { GetPageByPath } from "./GetPageByPath";
import type { WbPagesStorageOperations } from "~/context/pages/page.types";

interface GetPageByPathUseCasesParams {
    getOperation: WbPagesStorageOperations["get"];
}

export const getGetPageByPathUseCase = (params: GetPageByPathUseCasesParams) => {
    const getPageByPathUseCase = new GetPageByPath(params.getOperation);

    return {
        getPageByPathUseCase
    };
};
