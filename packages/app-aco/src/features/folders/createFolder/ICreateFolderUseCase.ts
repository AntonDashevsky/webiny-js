import { type FolderPermission } from "~/types.js";

export interface CreateFolderParams {
    title: string;
    slug: string;
    type: string;
    parentId: string | null;
    permissions: FolderPermission[];
    extensions?: Record<string, any>;
}

export interface ICreateFolderUseCase {
    execute: (params: CreateFolderParams) => Promise<void>;
}
