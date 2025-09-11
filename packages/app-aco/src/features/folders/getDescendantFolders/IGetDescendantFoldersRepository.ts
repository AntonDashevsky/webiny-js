import type { Folder } from "../Folder";

export interface IGetDescendantFoldersRepository {
    execute: (id: string) => Folder[];
}
