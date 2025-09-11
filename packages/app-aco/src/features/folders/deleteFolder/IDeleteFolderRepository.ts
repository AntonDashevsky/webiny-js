import type { Folder } from "../Folder.js";

export interface IDeleteFolderRepository {
    execute: (folder: Folder) => Promise<void>;
}
