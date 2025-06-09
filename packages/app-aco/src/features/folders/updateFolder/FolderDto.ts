import { type FolderPermission } from "~/types.js";

export interface FolderDto {
    id: string;
    title: string;
    slug: string;
    permissions: FolderPermission[];
    parentId: string | null;
    extensions: Record<string, any>;
}
