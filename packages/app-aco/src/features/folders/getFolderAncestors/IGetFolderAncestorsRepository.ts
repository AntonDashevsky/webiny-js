import type { Folder } from "~/features/index.js";

export interface IGetFolderAncestorsRepository {
    execute: (id: string) => Folder[];
}
