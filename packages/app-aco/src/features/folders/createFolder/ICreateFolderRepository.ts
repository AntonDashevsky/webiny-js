import { type Folder } from "../Folder.js";

export interface ICreateFolderRepository {
    execute: (folder: Folder) => Promise<void>;
}
