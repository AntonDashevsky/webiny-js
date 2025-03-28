import { FolderGqlDto } from "./FolderGqlDto.js";

export interface ListFoldersGatewayParams {
    type: string;
}

export interface IListFoldersGateway {
    execute: (params: ListFoldersGatewayParams) => Promise<FolderGqlDto[]>;
}
