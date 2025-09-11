import { createFolderFieldDecoratorFactory } from "@webiny/app-aco";
import type { AdvancedSearchConfig } from "./AdvancedSearch";
import { AdvancedSearch } from "./AdvancedSearch";
import type { BulkActionConfig } from "./BulkAction";
import { BulkAction } from "./BulkAction";
import type { EntryActionConfig } from "./EntryAction";
import { EntryAction } from "./EntryAction";
import type { FilterConfig } from "./Filter";
import { Filter } from "./Filter";
import type { FiltersToWhereConverter } from "./FiltersToWhere";
import { FiltersToWhere } from "./FiltersToWhere";
import type { FolderActionConfig } from "./FolderAction";
import { FolderAction } from "./FolderAction";
import type { TableConfig } from "./Table";
import { Table } from "./Table";
import { shouldDecorateFolderField } from "./FolderFieldDecorator";

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
