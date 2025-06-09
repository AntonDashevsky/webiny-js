import type * as React from "react";
import { type Plugin } from "@webiny/plugins/types.js";
import { type SecurityPermission } from "@webiny/app-security/types.js";
import { type FileItem } from "@webiny/app-admin/types.js";
import { type FolderTableItem, type RecordTableItem } from "@webiny/app-aco/types.js";

export type { FileInput } from "./modules/FileManagerApiProvider/graphql.js";

export type PermissionRendererPluginRenderFunctionType = (props: {
    value: SecurityPermission;
    setValue: (newValue: SecurityPermission) => void;
}) => React.ReactElement<any>;

export type PermissionRendererFileManager = Plugin & {
    type: "permission-renderer-file-manager";
    key: string;
    label: string;
    render: PermissionRendererPluginRenderFunctionType;
};

export interface Settings {
    uploadMinFileSize: string;
    uploadMaxFileSize: string;
    srcPrefix: string;
}
export interface QueryGetSettingsResult {
    fileManager: {
        getSettings: {
            data: Settings;
            error: Error | null;
        };
    };
}

export interface FileTag {
    tag: string;
    count: number;
}

export type FileTableItem = FileItem & RecordTableItem;

export type TableItem = FolderTableItem | FileTableItem;
