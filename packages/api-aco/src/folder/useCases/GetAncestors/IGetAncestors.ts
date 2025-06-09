import { type Folder } from "~/folder/folder.types.js";

export interface GetAncestorsParams {
    folder: Folder;
}

export interface IGetAncestors {
    execute: (params: GetAncestorsParams) => Promise<Folder[]>;
}
