import type { FolderDto } from "./FolderDto.js";
import type { FolderGqlDto } from "./FolderGqlDto.js";

export interface ICreateFolderGateway {
    execute: (folderDto: FolderDto) => Promise<FolderGqlDto>;
}
