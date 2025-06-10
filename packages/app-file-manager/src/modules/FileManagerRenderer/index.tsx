import React from "react";
import { Wcp } from "@webiny/app-admin";
import { DeleteFolder, EditFolder, SetFolderPermissions } from "@webiny/app-aco";
import { FileManagerViewConfig as FileManagerConfig } from "~/index";
import { FileManagerRenderer } from "./FileManagerView";
import { FilterByType } from "./filters/FilterByType";
import { ActionDelete, ActionEdit, ActionMove } from "~/components/BulkActions";
import { Name, Tags, Aliases, AccessControl } from "~/components/fields";
import {
    CellActions,
    CellAuthor,
    CellCreated,
    CellModified,
    CellName,
    CellSize,
    CellType,
    CopyFile,
    DeleteFile,
    EditFile,
    MoveFile
} from "~/components/Table";
import { GridItemDefaultRenderer } from "~/modules/ThumbnailRenderers/GridItemDefaultRenderer";
import { GridItemImageRenderer } from "~/modules/ThumbnailRenderers/GridItemImageRenderer";
import { FileActions } from "~/modules/FileManagerRenderer/FileActions";
import { FilePreviewImageRenderer } from "~/modules/ThumbnailRenderers/FilePreviewImageRenderer";
import { TableItemDefaultRenderer } from "~/modules/ThumbnailRenderers/TableItemDefaultRenderer";
import { TableItemImageRenderer } from "~/modules/ThumbnailRenderers/TableItemImageRenderer";
import { FilePreviewDefaultRenderer } from "~/modules/ThumbnailRenderers/FilePreviewDefaultRenderer";

const { Browser, FileDetails } = FileManagerConfig;

export const FileManagerRendererModule = () => {
    return (
        <>
            <FileManagerRenderer />
            <FileManagerConfig>
                {/* Filters */}
                <Browser.FilterByTags />
                <Browser.Filter name={"type"} element={<FilterByType />} />
                {/* Bulk Actions */}
                <Browser.BulkAction name={"edit"} element={<ActionEdit />} />
                <Browser.BulkAction name={"move"} element={<ActionMove />} />
                <Browser.BulkAction name={"delete"} element={<ActionDelete />} />
                {/* Folder Actions */}
                <Browser.FolderAction name={"edit"} element={<EditFolder />} />
                <Browser.FolderAction name={"permissions"} element={<SetFolderPermissions />} />
                <Browser.FolderAction name={"delete"} element={<DeleteFolder />} />
                {/* File Actions */}
                <Browser.FileAction name={"copy"} element={<CopyFile />} />
                <Browser.FileAction name={"edit"} element={<EditFile />} />
                <Browser.FileAction name={"move"} element={<MoveFile />} />
                <Browser.FileAction name={"delete"} element={<DeleteFile />} />
                {/* Table Columns */}
                <Browser.Table.Column
                    name={"name"}
                    header={"Name"}
                    cell={<CellName />}
                    sortable={true}
                    hideable={false}
                    size={200}
                />
                <Browser.Table.Column name={"type"} header={"Type"} cell={<CellType />} />
                <Browser.Table.Column
                    name={"size"}
                    header={"Size"}
                    cell={<CellSize />}
                    sortable={true}
                />
                <Browser.Table.Column name={"createdBy"} header={"Author"} cell={<CellAuthor />} />
                <Browser.Table.Column
                    name={"createdOn"}
                    header={"Created"}
                    cell={<CellCreated />}
                    sortable={true}
                />
                <Browser.Table.Column
                    name={"savedOn"}
                    header={"Modified"}
                    cell={<CellModified />}
                    sortable={true}
                />
                <Browser.Table.Column
                    name={"actions"}
                    header={" "}
                    cell={<CellActions />}
                    size={56}
                    className={"wby-text-right"}
                    hideable={false}
                    resizable={false}
                />
                {/* File Details Fields */}
                <FileDetails.Field name={"name"} element={<Name />} />
                <FileDetails.Field name={"tags"} element={<Tags />} />
                <Browser.BulkEditField name={"tags"} element={<Tags />} />
                <FileDetails.Field name={"aliases"} element={<Aliases />} />
                <FileDetails.GroupFields value={false} />
                {/* File Details Actions */}
                <FileActions />
                {/* Access Control */}
                <Wcp.CanUsePrivateFiles>
                    <FileDetails.Field
                        name={"accessControl"}
                        element={<AccessControl defaultValue={"public"} />}
                        after={"tags"}
                    />
                    <Browser.BulkEditField
                        name={"accessControl"}
                        element={<AccessControl placeholder={"Select privacy settings"} />}
                    />
                </Wcp.CanUsePrivateFiles>
                {/* Grid Thumbnail */}
                <Browser.Grid.Item.Thumbnail type={"*/*"} element={<GridItemDefaultRenderer />} />
                <Browser.Grid.Item.Thumbnail type={"image/*"} element={<GridItemImageRenderer />} />
                {/* Table Thumbnail */}
                <Browser.Table.Cell.Thumbnail
                    type={"image/*"}
                    element={<TableItemImageRenderer />}
                />
                <Browser.Table.Cell.Thumbnail type={"*/*"} element={<TableItemDefaultRenderer />} />
                {/* File Details Thumbnail */}
                <FileDetails.Preview.Thumbnail
                    type={"*/*"}
                    element={<FilePreviewDefaultRenderer />}
                />
                <FileDetails.Preview.Thumbnail
                    type={"image/*"}
                    element={<FilePreviewImageRenderer />}
                />
            </FileManagerConfig>
        </>
    );
};
