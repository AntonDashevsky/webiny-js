import { BulkAction, BulkActionConfig } from "./BulkAction.js";
import { FolderAction, FolderActionConfig } from "./FolderAction.js";
import { PageAction, PageActionConfig } from "./PageAction.js";
import { Table, TableConfig } from "./Table/index.js";

export interface BrowserConfig {
    bulkActions: BulkActionConfig[];
    folderActions: FolderActionConfig[];
    pageActions: PageActionConfig[];
    table: TableConfig;
}

export const Browser = {
    BulkAction,
    FolderAction,
    PageAction,
    Table
};
