import { BulkAction, BulkActionConfig } from "./BulkAction.js";
import { Filter, FilterConfig } from "./Filter.js";
import { FiltersToWhere, FiltersToWhereConverter } from "./FiltersToWhere.js";
import { FilterByTags } from "./FilterByTags.js";
import { FolderAction, type FolderActionConfig } from "./FolderAction.js";
import { FileAction, FileActionConfig } from "./FileAction.js";
import { Table, TableConfig } from "./Table/index.js";
import { BulkEditField, BulkEditFieldConfig } from "./BulkEditField.js";
import { Action } from "./Grid/Action.js";
import { Thumbnail } from "./Grid/Thumbnail.js";
import { GridConfig } from "./Grid/index.js";
import { ActionButton } from "~/components/Grid/ActionButton.js";

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
        Item: {
            Thumbnail,
            Action: Object.assign(Action, { IconButton: ActionButton })
        }
    },
    BulkAction,
    BulkEditField,
    Filter,
    FiltersToWhere,
    FilterByTags,
    FolderAction,
    FileAction,
    Table
};
