import {
    RedirectAction,
    type RecordActionConfig as RedirectActionConfig
} from "./RedirectAction.js";
import { Table, type TableConfig } from "./Table/index.js";
import { FiltersToWhere, type FiltersToWhereConverter } from "./FiltersToWhere.js";
import { Filter, type FilterConfig } from "./Filter.js";
import { FolderAction, type FolderActionConfig } from "./FolderAction.js";
import { BulkAction, type BulkActionConfig } from "./BulkAction.js";

export interface BrowserConfig {
    bulkActions: BulkActionConfig[];
    filters: FilterConfig[];
    filtersToWhere: FiltersToWhereConverter[];
    folderActions: FolderActionConfig[];
    redirectActions: RedirectActionConfig[];
    table: TableConfig;
}

export const Browser = {
    BulkAction,
    Filter,
    FiltersToWhere,
    Folder: {
        Action: FolderAction
    },
    Record: {
        Action: RedirectAction
    },
    Table
};
