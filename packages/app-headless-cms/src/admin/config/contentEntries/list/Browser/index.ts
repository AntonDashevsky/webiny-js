import { createFolderFieldDecoratorFactory } from "@webiny/app-aco";
import { AdvancedSearch, type AdvancedSearchConfig } from "./AdvancedSearch/index.js";
import { BulkAction, type BulkActionConfig } from "./BulkAction.js";
import { EntryAction, type EntryActionConfig } from "./EntryAction.js";
import { Filter, type FilterConfig } from "./Filter.js";
import { FiltersToWhere, type FiltersToWhereConverter } from "./FiltersToWhere.js";
import { FolderAction, type FolderActionConfig } from "./FolderAction.js";
import { Table, type TableConfig } from "./Table/index.js";
import { shouldDecorateFolderField } from "./FolderFieldDecorator.js";

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
    Folder: {
        ExtensionField: {
            createDecorator: createFolderFieldDecoratorFactory({
                scope: "cms",
                shouldDecorate: shouldDecorateFolderField
            })
        },
        Action: FolderAction
    },
    Table,
    /**
     * @deprecated
     * Use `Browser.Folder.Action` instead
     */
    FolderAction
};
