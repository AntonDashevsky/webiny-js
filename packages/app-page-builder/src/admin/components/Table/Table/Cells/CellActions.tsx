import React from "react";
import { FolderProvider, useAcoConfig } from "@webiny/app-aco";
import type { SearchRecordItem } from "@webiny/app-aco/table.types";
import { OptionsMenu } from "@webiny/app-admin";
import { PageListConfig } from "~/admin/config/pages";
import { PageProvider } from "~/admin/contexts/Page";
import type { PbPageDataItem } from "~/types";

export const CellActions = () => {
    const { useTableRow, isFolderRow } = PageListConfig.Browser.Table.Column;
    const { row } = useTableRow();
    const { folder: folderConfig, record: recordConfig } = useAcoConfig();

    if (isFolderRow(row)) {
        // If the user cannot manage folder structure, no need to show the menu.
        if (!row.data.canManageStructure) {
            return null;
        }

        return (
            <FolderProvider folder={row.data}>
                <OptionsMenu
                    actions={folderConfig.actions}
                    data-testid={"table.row.folder.menu-action"}
                />
            </FolderProvider>
        );
    }

    return (
        // `row` is a table row envelope. `row.data` is a Search record envelope. `row.data.data` is page data.
        <PageProvider<SearchRecordItem<PbPageDataItem>> page={row.data}>
            <OptionsMenu
                actions={recordConfig.actions}
                data-testid={"table.row.pb.page.menu-action"}
            />
        </PageProvider>
    );
};
