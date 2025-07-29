import { useMemo } from "react";
import { createConfigurableComponent } from "@webiny/react-properties";
import type { AdvancedSearchConfig } from "./advanced-search";
import { AdvancedSearch } from "./advanced-search";
import type { RecordConfig } from "./record";
import { Record } from "./record";
import type { FolderConfig } from "./folder";
import { Folder } from "./folder";
import type { TableConfig } from "~/config/table";
import { Table } from "~/config/table";

export { FieldRendererConfig as AdvancedSearchFieldRendererConfig } from "./advanced-search/FieldRenderer";
export { ActionConfig as RecordActionConfig } from "./record/Action";
export { ActionConfig as FolderActionConfig } from "./folder/Action";
export { ColumnConfig as TableColumnConfig } from "./table/Column";
export { SortingConfig as TableSortingConfig } from "./table/Sorting";

const base = createConfigurableComponent<AcoConfig>("AcoConfig");

export const AcoConfig = Object.assign(base.Config, { AdvancedSearch, Folder, Record, Table });
export const AcoWithConfig = base.WithConfig;

interface AcoConfig {
    advancedSearch: AdvancedSearchConfig;
    record: RecordConfig;
    folder: FolderConfig;
    table: TableConfig;
}

export function useAcoConfig() {
    const config = base.useConfig();

    const advancedSearch = config.advancedSearch || {};
    const folder = config.folder || {};
    const record = config.record || {};
    const table = config.table || {};

    return useMemo(
        () => ({
            advancedSearch: {
                ...advancedSearch,
                fieldRenderers: [...(advancedSearch.fieldRenderers || [])]
            },
            folder: {
                ...folder,
                actions: [...(folder.actions || [])]
            },
            record: {
                ...record,
                actions: [...(record.actions || [])]
            },
            table: {
                ...table,
                columns: [...(table.columns || [])],
                sorting: [...(table.sorting || [])]
            }
        }),
        [config]
    );
}
