import { Folder } from "../Folder.js";

export interface IGetDescendantFoldersRepository {
    execute: (id: string) => Folder[];
}
