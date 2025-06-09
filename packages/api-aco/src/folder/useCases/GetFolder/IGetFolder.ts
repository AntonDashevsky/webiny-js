import type { Folder, GetFolderParams } from "~/folder/folder.types.js";

export interface IGetFolder {
    execute: (params: GetFolderParams) => Promise<Folder>;
}
