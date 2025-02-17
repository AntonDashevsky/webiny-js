import { BulkAction, BulkActionConfig } from "./BulkAction.js";
import { EntryAction, EntryActionConfig } from "./EntryAction.js";
import { Table, TableConfig } from "./Table/index.js";

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
