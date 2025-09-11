import { createFolderFieldDecoratorFactory } from "@webiny/app-aco";
import type { BulkActionConfig } from "./BulkAction";
import { BulkAction } from "./BulkAction";
import type { FilterConfig } from "./Filter";
import { Filter } from "./Filter";
import type { FiltersToWhereConverter } from "./FiltersToWhere";
import { FiltersToWhere } from "./FiltersToWhere";
import { FilterByTags } from "./FilterByTags";
import type { FolderActionConfig } from "./FolderAction";
import { FolderAction } from "./FolderAction";
import type { FileActionConfig } from "./FileAction";
import { FileAction } from "./FileAction";
import type { TableConfig } from "./Table";
import { Table } from "./Table";
import type { BulkEditFieldConfig } from "./BulkEditField";
import { BulkEditField } from "./BulkEditField";
import { Action } from "./Grid/Action";
import { Thumbnail } from "./Grid/Thumbnail";
import type { GridConfig } from "./Grid";
import { ActionButton } from "~/components/Grid/ActionButton";
import { File } from "~/components/Grid/File";
import { shouldDecorateFolderField } from "./FolderFieldDecorator";

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
