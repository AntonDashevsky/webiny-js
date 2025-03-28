import { FolderDto } from "./FolderDto.js";
import { FolderGqlDto } from "./FolderGqlDto.js";

export interface IUpdateFolderGateway {
    execute: (folder: FolderDto) => Promise<FolderGqlDto>;
}
