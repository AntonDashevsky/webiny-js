import { createFolderFieldDecoratorFactory } from "@webiny/app-aco";
import { BulkAction, type BulkActionConfig } from "./BulkAction.js";
import { FolderAction, type FolderActionConfig } from "./FolderAction.js";
import { PageAction, type PageActionConfig } from "./PageAction.js";
import { Table, type TableConfig } from "./Table/index.js";
import { shouldDecorateFolderField } from "./FolderFieldDecorator.js";

export interface BrowserConfig {
    bulkActions: BulkActionConfig[];
    folderActions: FolderActionConfig[];
    pageActions: PageActionConfig[];
    table: TableConfig;
}

export const Browser = {
    BulkAction,
    PageAction,
    Table,
    Folder: {
        ExtensionField: {
            createDecorator: createFolderFieldDecoratorFactory({
                scope: "pb.page",
                shouldDecorate: shouldDecorateFolderField
            })
        },
        Action: FolderAction
    },
    /**
     * @deprecated
     * Use `Browser.Folder.Action` instead
     */
    FolderAction
};
