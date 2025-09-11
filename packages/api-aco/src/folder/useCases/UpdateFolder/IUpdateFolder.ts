import type { Folder, UpdateFolderParams } from "~/folder/folder.types.js";

export interface IUpdateFolder {
    execute: (id: string, data: UpdateFolderParams) => Promise<Folder>;
}
