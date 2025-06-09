import type {
    FolderLevelPermissionsTarget,
    FolderLevelPermissionsTargetListMeta
} from "~/folder/folder.types.js";

export interface IListFolderLevelPermissionsTargets {
    execute: () => Promise<[FolderLevelPermissionsTarget[], FolderLevelPermissionsTargetListMeta]>;
}
