import type {
    GetFolderHierarchyParams,
    GetFolderHierarchyResponse
} from "~/folder/folder.types.js";

export interface IGetFolderHierarchy {
    execute: (params: GetFolderHierarchyParams) => Promise<GetFolderHierarchyResponse>;
}
