import type { EntryActionConfig } from "./EntryAction";
import { EntryAction } from "./EntryAction";
import type { TableConfig } from "./Table";
import { Table } from "./Table";

export interface BrowserConfig {
    entryActions: EntryActionConfig[];
    table: TableConfig;
}

export const Browser = {
    EntryAction,
    Table
};
