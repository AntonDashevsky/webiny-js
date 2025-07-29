import type { Folder, ListFoldersParams } from "~/folder/folder.types";
import type { ListMeta } from "~/types";

export interface IListFolders {
    execute: (params: ListFoldersParams) => Promise<[Folder[], ListMeta]>;
}
