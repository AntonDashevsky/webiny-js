import type { Folder, ListFoldersParams } from "~/folder/folder.types.js";
import { type ListMeta } from "~/types.js";

export interface IListFolders {
    execute: (params: ListFoldersParams) => Promise<[Folder[], ListMeta]>;
}
