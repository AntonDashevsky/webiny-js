import type { WbPagesStorageOperations } from "~/context/pages/pages.types.js";
import { ListPages } from "./ListPages.js";

interface ListPagesUseCasesParams {
    listOperation: WbPagesStorageOperations["list"];
}

export const getListPagesUseCase = (params: ListPagesUseCasesParams) => {
    const listPagesUseCase = new ListPages(params.listOperation);

    return {
        listPagesUseCase
    };
};
