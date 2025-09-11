import React from "react";
import { Icon, Link, Text } from "@webiny/admin-ui";
import { ReactComponent as File } from "@webiny/icons/description.svg";
import { PageListConfig } from "~/modules/pages/configs/index.js";
import { useGetEditPageUrl } from "~/modules/pages/PagesList/hooks/useGetEditPageUrl.js";
import { FolderCellName } from "~/modules/shared/FolderCellName.js";
import type { PageDto } from "~/domain/Page/index.js";

interface PageCellRowTitleProps {
    page: PageDto;
}

const PageCellRowTitle = ({ page }: PageCellRowTitleProps) => {
    return (
        <div className={"wby-flex wby-flex-col wby-gap-y-[3px]"}>
            <div className={"wby-flex wby-w-full wby-items-center"}>
                <Icon
                    size={"sm"}
                    color={"neutral-strong"}
                    className={"wby-mr-xs"}
                    icon={<File />}
                    label={`Page - ${page.properties.title}`}
                />
                <Text as={"div"} className={"wby-truncate wby-min-w-0 wby-flex-shrink"}>
                    {page.properties.title}
                </Text>
            </div>
            <Text as={"div"} size={"sm"} className={"wby-text-neutral-dimmed"}>
                {page.properties.path}
            </Text>
        </div>
    );
};

interface EntryCellNameProps {
    page: PageDto;
}

export const PageCellName = ({ page }: EntryCellNameProps) => {
    const { getEditPageUrl } = useGetEditPageUrl();

    return (
        <Link
            to={getEditPageUrl(page.id)}
            variant={"secondary"}
            className={"wby-truncate !wby-no-underline"}
        >
            <PageCellRowTitle page={page} />
        </Link>
    );
};

export const CellName = () => {
    const { useTableRow, isFolderRow } = PageListConfig.Browser.Table.Column;
    const { row } = useTableRow();

    if (isFolderRow(row)) {
        return <FolderCellName folder={row.data} />;
    }

    return <PageCellName page={row.data} />;
};
