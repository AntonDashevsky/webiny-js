import type { AcoFolderStorageOperations } from "~/folder/folder.types.js";
import { GetFolder } from "./GetFolder.js";
import { GetFolderWithFolderLevelPermissions } from "./GetFolderWithFolderLevelPermissions.js";
import { type FolderLevelPermissions } from "~/flp/index.js";

interface GetFolderUseCasesParams {
    getOperation: AcoFolderStorageOperations["getFolder"];
    folderLevelPermissions: FolderLevelPermissions;
}

export const getGetFolderUseCase = (params: GetFolderUseCasesParams) => {
    const getFolder = new GetFolder(params.getOperation);
    const getFolderUseCase = new GetFolderWithFolderLevelPermissions(
        params.folderLevelPermissions,
        getFolder
    );

    return {
        getFolderUseCase,
        getFolderUseCaseWithoutPermissions: getFolder
    };
};
