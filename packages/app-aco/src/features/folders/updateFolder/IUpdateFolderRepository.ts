import type { Folder } from "../Folder.js";

export interface IUpdateFolderRepository {
    execute: (folder: Folder) => Promise<void>;
}
