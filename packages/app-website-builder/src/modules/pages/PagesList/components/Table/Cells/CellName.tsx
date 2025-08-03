import React from "react";
import { Icon, Link, Text } from "@webiny/admin-ui";
import { ReactComponent as File } from "@webiny/icons/description.svg";
import { PageListConfig } from "~/modules/pages/configs";
import type { DocumentDto } from "~/modules/pages/PagesList/presenters/index.js";
import { useGetEditPageUrl } from "~/modules/pages/PagesList/hooks/useGetEditPageUrl.js";
import { FolderCellName } from "~/modules/shared/FolderCellName";

interface DocumentCellRowTitleProps {
    document: DocumentDto;
}

const DocumentCellRowTitle = ({ document }: DocumentCellRowTitleProps) => {
    return (
        <div className={"wby-flex wby-flex-col wby-gap-y-[3px]"}>
            <div className={"wby-flex wby-w-full wby-items-center"}>
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
            <Text as={"div"} size={"sm"} className={"wby-text-neutral-dimmed"}>
                {document.data.properties.path}
            </Text>
        </div>
    );
};

interface EntryCellNameProps {
    document: DocumentDto;
}

export const DocumentCellName = ({ document }: EntryCellNameProps) => {
    const { getEditPageUrl } = useGetEditPageUrl();
    return (
        <Link
            to={getEditPageUrl(document.id)}
            variant={"secondary"}
            className={"wby-truncate !wby-no-underline"}
        >
            <DocumentCellRowTitle document={document} />
        </Link>
    );
};

export const CellName = () => {
    const { useTableRow, isFolderRow } = PageListConfig.Browser.Table.Column;
    const { row } = useTableRow();

    if (isFolderRow(row)) {
        return <FolderCellName folder={row} />;
    }

    return <DocumentCellName document={row} />;
};
