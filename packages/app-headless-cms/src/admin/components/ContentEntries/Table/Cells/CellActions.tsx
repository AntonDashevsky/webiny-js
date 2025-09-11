import React from "react";
import { FolderProvider, useAcoConfig } from "@webiny/app-aco";
import { makeDecoratable, OptionsMenu } from "@webiny/app-admin";
import { ContentEntryListConfig } from "~/admin/config/contentEntries/index.js";
import { EntryProvider } from "~/admin/hooks/useEntry.js";

const DefaultCellActions = () => {
    const { useTableRow, isFolderRow } = ContentEntryListConfig.Browser.Table.Column;
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
        <EntryProvider entry={row.data}>
            <OptionsMenu
                actions={recordConfig.actions}
                data-testid={"table.row.pb.entry.menu-action"}
            />
        </EntryProvider>
    );
};

export const CellActions = makeDecoratable("CellActions", DefaultCellActions);
