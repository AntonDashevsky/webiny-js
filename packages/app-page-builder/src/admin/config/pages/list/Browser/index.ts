import { createFolderFieldDecoratorFactory } from "@webiny/app-aco";
import type { BulkActionConfig } from "./BulkAction";
import { BulkAction } from "./BulkAction";
import type { FolderActionConfig } from "./FolderAction";
import { FolderAction } from "./FolderAction";
import type { PageActionConfig } from "./PageAction";
import { PageAction } from "./PageAction";
import type { TableConfig } from "./Table";
import { Table } from "./Table";
import { shouldDecorateFolderField } from "./FolderFieldDecorator";

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
