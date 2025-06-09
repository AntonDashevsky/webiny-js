import { GetAncestors } from "./GetAncestors.js";
import type { IListFolders } from "~/folder/useCases/ListFolders/IListFolders.js";

interface GetAncestorsUseCasesParams {
    listFoldersUseCase: IListFolders;
}

export const getGetAncestors = (params: GetAncestorsUseCasesParams) => {
    const getAncestorsUseCase = new GetAncestors(params.listFoldersUseCase);

    return {
        getAncestorsUseCase
    };
};
