import type { FolderGqlDto } from "./FolderGqlDto";

export interface ListFoldersGatewayParams {
    type: string;
}

export interface IListFoldersGateway {
    execute: (params: ListFoldersGatewayParams) => Promise<FolderGqlDto[]>;
}
