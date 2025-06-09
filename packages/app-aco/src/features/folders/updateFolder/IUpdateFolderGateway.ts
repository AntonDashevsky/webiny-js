import { type FolderDto } from "./FolderDto.js";
import { type FolderGqlDto } from "./FolderGqlDto.js";

export interface IUpdateFolderGateway {
    execute: (folder: FolderDto) => Promise<FolderGqlDto>;
}
