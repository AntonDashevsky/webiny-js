import { GetPageRevisions } from "./GetPageRevisions";
import type { WbPagesStorageOperations } from "~/page/page.types";

interface GetPageRevisionsUseCasesParams {
    getRevisions: WbPagesStorageOperations["getRevisions"];
}

export const getGetPageRevisionsUseCase = (params: GetPageRevisionsUseCasesParams) => {
    const getPageRevisionsUseCase = new GetPageRevisions(params.getRevisions);

    return {
        getPageRevisionsUseCase
    };
};
