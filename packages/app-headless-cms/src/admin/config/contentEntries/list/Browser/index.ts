import { AdvancedSearch, AdvancedSearchConfig } from "./AdvancedSearch/index.js";
import { BulkAction, BulkActionConfig } from "./BulkAction.js";
import { EntryAction, EntryActionConfig } from "./EntryAction.js";
import { Filter, FilterConfig } from "./Filter.js";
import { FiltersToWhere, FiltersToWhereConverter } from "./FiltersToWhere.js";
import { FolderAction, type FolderActionConfig } from "./FolderAction.js";
import { Table, TableConfig } from "./Table/index.js";

export interface BrowserConfig {
    advancedSearch: AdvancedSearchConfig;
    bulkActions: BulkActionConfig[];
    entryActions: EntryActionConfig[];
    filters: FilterConfig[];
    filtersToWhere: FiltersToWhereConverter[];
    folderActions: FolderActionConfig[];
    table: TableConfig;
}

export const Browser = {
    AdvancedSearch,
    BulkAction,
    EntryAction,
    Filter,
    FiltersToWhere,
    FolderAction,
    Table
};
