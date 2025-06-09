import { type FolderGqlDto } from "./FolderGqlDto.js";

export interface GetFolderHierarchyGatewayParams {
    type: string;
    id: string;
}

export interface GetFolderHierarchyGatewayResponse {
    parents: FolderGqlDto[];
    siblings: FolderGqlDto[];
}

export interface IGetFolderHierarchyGateway {
    execute: (
        params: GetFolderHierarchyGatewayParams
    ) => Promise<GetFolderHierarchyGatewayResponse>;
}
