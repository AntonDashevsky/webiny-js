import { GetPageRevisions } from "./GetPageRevisions.js";
import type { WbPagesStorageOperations } from "~/context/pages/pages.types.js";

interface GetPageRevisionsUseCasesParams {
    getRevisions: WbPagesStorageOperations["getRevisions"];
}

export const getGetPageRevisionsUseCase = (params: GetPageRevisionsUseCasesParams) => {
    const getPageRevisionsUseCase = new GetPageRevisions(params.getRevisions);

    return {
        getPageRevisionsUseCase
    };
};
