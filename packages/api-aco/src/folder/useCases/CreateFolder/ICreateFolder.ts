import type { CreateFolderParams, Folder } from "~/folder/folder.types.js";

export interface ICreateFolder {
    execute: (params: CreateFolderParams) => Promise<Folder>;
}
