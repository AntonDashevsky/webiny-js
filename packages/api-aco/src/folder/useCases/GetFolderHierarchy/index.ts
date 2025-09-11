import { GetFolderHierarchy } from "./GetFolderHierarchy.js";
import { GetFolderHierarchyWithFolderLevelPermissions } from "./GetFolderHierarchyWithFolderLevelPermissions.js";
import type { AcoFolderStorageOperations } from "~/folder/folder.types.js";
import type { FolderLevelPermissions } from "~/flp/index.js";

interface GetFolderHierarchyUseCasesParams {
    listOperation: AcoFolderStorageOperations["listFolders"];
    getOperation: AcoFolderStorageOperations["getFolder"];
    folderLevelPermissions: FolderLevelPermissions;
}

export const getGetFolderHierarchyUseCases = (params: GetFolderHierarchyUseCasesParams) => {
    const getFolderHierarchy = new GetFolderHierarchy(params.listOperation, params.getOperation);
    const getFolderHierarchyUseCase = new GetFolderHierarchyWithFolderLevelPermissions(
        params.folderLevelPermissions,
        getFolderHierarchy
    );

    return {
        getFolderHierarchyUseCase
    };
};
