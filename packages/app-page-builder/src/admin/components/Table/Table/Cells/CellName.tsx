import React from "react";

import { useNavigateFolder } from "@webiny/app-aco";
import { ReactComponent as Folder } from "@webiny/icons/folder.svg";
import { ReactComponent as FolderShared } from "@webiny/icons/folder_shared.svg";
import { ReactComponent as File } from "@webiny/icons/description.svg";

import { PageListConfig } from "~/admin/config/pages";
import { usePagesList } from "~/admin/views/Pages/hooks/usePagesList";
import { RowIcon, RowText, RowTitle } from "./Cells.styled";

import type { FolderItem } from "@webiny/app-aco/types";
import type { PbPageTableItem } from "~/types";

interface FolderCellNameProps {
    folder: FolderItem;
}

export const FolderCellName = ({ folder }: FolderCellNameProps) => {
    const { navigateToFolder } = useNavigateFolder();

    let icon = <Folder />;
    if (folder.hasNonInheritedPermissions && folder.canManagePermissions) {
        icon = <FolderShared />;
    }

    return (
        <RowTitle onClick={() => navigateToFolder(folder.id)}>
            <RowIcon>{icon}</RowIcon>
            <RowText use={"subtitle2"}>{folder.title}</RowText>
        </RowTitle>
    );
};

interface PageCellNameProps {
    page: PbPageTableItem;
}

export const PageCellName = ({ page }: PageCellNameProps) => {
    const { openPreviewDrawer } = usePagesList();

    return (
        <RowTitle onClick={() => openPreviewDrawer(page.data.id)}>
            <RowIcon>
                <File />
            </RowIcon>
            <RowText use={"subtitle2"}>{page.data.title}</RowText>
        </RowTitle>
    );
};

export const CellName = () => {
    const { useTableRow, isFolderRow } = PageListConfig.Browser.Table.Column;
    const { row } = useTableRow();

    if (isFolderRow(row)) {
        return <FolderCellName folder={row.data} />;
    }

    return <PageCellName page={row} />;
};
