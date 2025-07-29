import type { ListCache } from "../cache";
import type { IGetFolderLevelPermissionRepository } from "./IGetFolderLevelPermissionRepository";
import type { FolderPermissionName } from "./FolderPermissionName";
import type { Folder } from "../Folder";

export class GetFolderLevelPermissionRepository implements IGetFolderLevelPermissionRepository {
    private cache: ListCache<Folder>;
    private readonly permissionName: FolderPermissionName;

    constructor(cache: ListCache<Folder>, permissionName: FolderPermissionName) {
        this.cache = cache;
        this.permissionName = permissionName;
    }

    execute(id: string) {
        const folder = this.cache.getItem(folder => folder.id === id);

        if (!folder) {
            return false;
        }

        return folder[this.permissionName] ?? false;
    }
}
