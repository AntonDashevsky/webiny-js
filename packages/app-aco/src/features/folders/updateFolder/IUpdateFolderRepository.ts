import type { Folder } from "../Folder";

export interface IUpdateFolderRepository {
    execute: (folder: Folder) => Promise<void>;
}
