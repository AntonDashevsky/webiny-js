import type { AcoFolderStorageOperations } from "~/folder/folder.types.js";
import { ListFolders } from "./ListFolders.js";
import { ListFoldersWithFolderLevelPermissions } from "./ListFoldersWithFolderLevelPermissions.js";
import type { FolderLevelPermissions } from "~/flp/index.js";

interface ListFoldersUseCasesParams {
    listOperation: AcoFolderStorageOperations["listFolders"];
    folderLevelPermissions: FolderLevelPermissions;
}

export const getListFoldersUseCases = (params: ListFoldersUseCasesParams) => {
    const listFolders = new ListFolders(params.listOperation);
    const listFoldersUseCase = new ListFoldersWithFolderLevelPermissions(
        params.folderLevelPermissions,
        listFolders
    );

    return {
        listFoldersUseCase,
        listFoldersUseCaseWithoutPermissions: listFolders
    };
};
