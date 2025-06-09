import { BulkAction, type BulkActionConfig } from "./BulkAction.js";
import { EntryAction, type EntryActionConfig } from "./EntryAction.js";
import { Table, type TableConfig } from "./Table/index.js";

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
