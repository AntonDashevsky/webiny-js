import React from "react";

import { Icon, Text } from "@webiny/admin-ui";
import { ReactComponent as File } from "@webiny/icons/description.svg";

import type { DocumentDto } from "~/modules/redirects/RedirectsList/presenters/index.js";
import { RedirectListConfig } from "~/modules/redirects/configs";
import { FolderCellName } from "~/modules/shared/FolderCellName";
import { useEditRedirectDialog } from "~/modules/redirects/RedirectsList/index.js";

interface DocumentCellRowTitleProps {
    document: DocumentDto;
}

const DocumentCellRowTitle = ({ document }: DocumentCellRowTitleProps) => {
    const { showEditRedirectDialog } = useEditRedirectDialog();

    if (document.$type === "FOLDER") {
        return null;
    }

    return (
        <div className={"wby-flex wby-flex-col wby-gap-y-[3px]"}>
            <div
                className={"wby-flex wby-w-full wby-items-center wby-cursor-pointer"}
                onClick={() => showEditRedirectDialog(document.id)}
            >
                <Icon
                    size={"sm"}
                    color={"neutral-strong"}
                    className={"wby-mr-xs"}
                    icon={<File />}
                    label={`Document - ${document.title}`}
                />
                <Text as={"div"} className={"wby-truncate wby-min-w-0 wby-flex-shrink"}>
                    {document.title}
                </Text>
            </div>
        </div>
    );
};

interface EntryCellNameProps {
    document: DocumentDto;
}

export const DocumentCellName = ({ document }: EntryCellNameProps) => {
    return <DocumentCellRowTitle document={document} />;
};

export const CellName = () => {
    const { useTableRow, isFolderRow } = RedirectListConfig.Browser.Table.Column;
    const { row } = useTableRow();

    if (isFolderRow(row)) {
        return <FolderCellName folder={row} />;
    }

    return <DocumentCellName document={row} />;
};
