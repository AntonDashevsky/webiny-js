import type { FolderDto } from "./FolderDto";
import type { FolderGqlDto } from "./FolderGqlDto";

export interface IUpdateFolderGateway {
    execute: (folder: FolderDto) => Promise<FolderGqlDto>;
}
