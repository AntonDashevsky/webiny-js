import { FolderDto } from "./FolderDto.js";
import { FolderGqlDto } from "./FolderGqlDto.js";

export interface ICreateFolderGateway {
    execute: (folderDto: FolderDto) => Promise<FolderGqlDto>;
}
