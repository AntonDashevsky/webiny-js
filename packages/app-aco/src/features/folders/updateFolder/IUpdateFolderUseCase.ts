import type { FolderPermission } from "~/types.js";

export interface UpdateFolderParams {
    id: string;
    title: string;
    slug: string;
    type: string;
    parentId: string | null;
    permissions: FolderPermission[];
    extensions?: Record<string, any>;
}

export interface IUpdateFolderUseCase {
    execute: (params: UpdateFolderParams) => Promise<void>;
}
