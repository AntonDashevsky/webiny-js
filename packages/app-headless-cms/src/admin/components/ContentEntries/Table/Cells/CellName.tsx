import React from "react";

import { ReactComponent as Folder } from "@material-design-icons/svg/outlined/folder.svg";
import { ReactComponent as FolderShared } from "@material-design-icons/svg/outlined/folder_shared.svg";
import { ReactComponent as File } from "@material-design-icons/svg/outlined/description.svg";
import { useNavigateFolder } from "@webiny/app-aco";

import { ContentEntryListConfig } from "~/admin/config/contentEntries/index.js";
import { useContentEntriesList } from "~/admin/views/contentEntries/hooks/index.js";
import { usePermission } from "~/admin/hooks/index.js";

import { LinkTitle, RowIcon, RowText, RowTitle } from "./Cells.styled.js";

import { FolderTableItem } from "@webiny/app-aco/types.js";
import { EntryTableItem } from "~/types.js";

interface FolderCellNameProps {
    folder: FolderTableItem;
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

interface EntryCellRowTitleProps {
    entry: EntryTableItem;
}

const EntryCellRowTitle = ({ entry }: EntryCellRowTitleProps) => {
    return (
        <RowTitle>
            <RowIcon>
                <File />
            </RowIcon>
            <RowText use={"subtitle2"}>{entry.meta.title}</RowText>
        </RowTitle>
    );
};

interface EntryCellNameProps {
    entry: EntryTableItem;
}

export const EntryCellName = ({ entry }: EntryCellNameProps) => {
    const { getEntryEditUrl } = useContentEntriesList();
    const { canEdit } = usePermission();

    const entryEditUrl = getEntryEditUrl(entry);

    if (!canEdit(entry, "cms.contentEntry")) {
        return <EntryCellRowTitle entry={entry} />;
    }

    return (
        <LinkTitle to={entryEditUrl}>
            <EntryCellRowTitle entry={entry} />
        </LinkTitle>
    );
};

export const CellName = () => {
    const { useTableRow, isFolderRow } = ContentEntryListConfig.Browser.Table.Column;
    const { row } = useTableRow();

    if (isFolderRow(row)) {
        return <FolderCellName folder={row} />;
    }

    return <EntryCellName entry={row} />;
};
