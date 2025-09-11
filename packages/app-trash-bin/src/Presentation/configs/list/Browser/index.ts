import type { BulkActionConfig } from "./BulkAction";
import { BulkAction } from "./BulkAction";
import type { EntryActionConfig } from "./EntryAction";
import { EntryAction } from "./EntryAction";
import type { TableConfig } from "./Table";
import { Table } from "./Table";

export interface BrowserConfig {
    bulkActions: BulkActionConfig[];
    entryActions: EntryActionConfig[];
    table: TableConfig;
}

export const Browser = {
    BulkAction,
    EntryAction,
    Table
};
