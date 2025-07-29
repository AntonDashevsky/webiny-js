import type { FolderDto } from "./FolderDto";
import type { FolderGqlDto } from "./FolderGqlDto";

export interface ICreateFolderGateway {
    execute: (folderDto: FolderDto) => Promise<FolderGqlDto>;
}
