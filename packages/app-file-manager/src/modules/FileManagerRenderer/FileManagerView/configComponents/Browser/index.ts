import { createFolderFieldDecoratorFactory } from "@webiny/app-aco";
import { BulkAction, type BulkActionConfig } from "./BulkAction.js";
import { Filter, type FilterConfig } from "./Filter.js";
import { FiltersToWhere, type FiltersToWhereConverter } from "./FiltersToWhere.js";
import { FilterByTags } from "./FilterByTags.js";
import { FolderAction, type FolderActionConfig } from "./FolderAction.js";
import { FileAction, type FileActionConfig } from "./FileAction.js";
import { Table, type TableConfig } from "./Table/index.js";
import { BulkEditField, type BulkEditFieldConfig } from "./BulkEditField.js";
import { Action } from "./Grid/Action.js";
import { Thumbnail } from "./Grid/Thumbnail.js";
import { type GridConfig } from "./Grid/index.js";
import { ActionButton } from "~/components/Grid/ActionButton.js";
import { File } from "~/components/Grid/File.js";
import { shouldDecorateFolderField } from "./FolderFieldDecorator.js";

export interface BrowserConfig {
    bulkActions: BulkActionConfig[];
    bulkEditFields: BulkEditFieldConfig[];
    filters: FilterConfig[];
    filtersToWhere: FiltersToWhereConverter[];
    filterByTags: boolean;
    folderActions: FolderActionConfig[];
    fileActions: FileActionConfig[];
    table: TableConfig;
    grid: GridConfig;
}

export const Browser = {
    Grid: {
        Item: Object.assign(File, {
            Thumbnail,
            Action: Object.assign(Action, { IconButton: ActionButton })
        })
    },
    BulkAction,
    BulkEditField,
    Filter,
    FiltersToWhere,
    FilterByTags,
    Folder: {
        ExtensionField: {
            createDecorator: createFolderFieldDecoratorFactory({
                scope: "fm",
                shouldDecorate: shouldDecorateFolderField
            })
        },
        Action: FolderAction
    },
    /**
     * @deprecated
     * Use `Browser.Folder.Action` instead
     */
    FolderAction,
    FileAction,
    Table
};
