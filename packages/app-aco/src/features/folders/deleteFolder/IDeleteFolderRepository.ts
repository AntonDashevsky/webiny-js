import type { Folder } from "../Folder";

export interface IDeleteFolderRepository {
    execute: (folder: Folder) => Promise<void>;
}
