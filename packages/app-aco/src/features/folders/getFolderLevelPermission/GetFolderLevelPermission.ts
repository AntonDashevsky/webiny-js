import { IGetFolderLevelPermissionUseCase } from "./IGetFolderLevelPermissionUseCase.js";
import { GetFolderLevelPermissionRepository } from "./GetFolderLevelPermissionRepository.js";
import { GetFolderLevelPermissionWithFlpUseCase } from "./GetFolderLevelPermissionWithFlpUseCase.js";
import { GetFolderLevelPermissionUseCase } from "./GetFolderLevelPermissionUseCase.js";
import { FolderPermissionName } from "./FolderPermissionName.js";
import { folderCacheFactory } from "../cache/index.js";

export class GetFolderLevelPermission {
    public static getInstance(
        type: string,
        permissionName: FolderPermissionName,
        canUseFlp: boolean
    ): IGetFolderLevelPermissionUseCase {
        const foldersCache = folderCacheFactory.getCache(type);
        const repository = new GetFolderLevelPermissionRepository(foldersCache, permissionName);

        if (canUseFlp) {
            return new GetFolderLevelPermissionWithFlpUseCase(repository);
        }

        return new GetFolderLevelPermissionUseCase();
    }
}
