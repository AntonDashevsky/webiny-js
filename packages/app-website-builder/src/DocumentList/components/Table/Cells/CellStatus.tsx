import React, { useCallback, useMemo } from "react";
import { IconButton, Tag } from "@webiny/admin-ui";
import { ReactComponent as NewTab } from "@webiny/icons/open_in_new.svg";
import { PageListConfig } from "~/configs/index.js";
import { toTitleCaseLabel } from "~/shared/toTitleCaseLabel";
import { usePagePreviewLink } from "~/DocumentList/hooks/useDocumentPreviewLink";
import { PageDto } from "~/domain/Page";

const { useTableRow, isFolderRow } = PageListConfig.Browser.Table.Column;

export const CellStatus = () => {
    const { row } = useTableRow<{ data: PageDto }>();
    const previewLink = usePagePreviewLink(row.data);

    if (isFolderRow(row)) {
        return <>{"-"}</>;
    }

    const variant = useMemo(() => {
        switch (row.data.status) {
            case "published":
                return "success";
            case "unpublished":
                return "warning";
            default:
                return "neutral-light";
        }
    }, [row.data.status]);

    const statusLabel = useMemo(() => {
        return toTitleCaseLabel(row.data.status);
    }, [row.data.status]);

    const openInNewTab = useCallback(() => {
        if (previewLink) {
            window.open(previewLink, "_blank");
        }
    }, [previewLink]);

    return (
        <div className={"wby-flex wby-items-center"}>
            <Tag
                variant={variant}
                content={`${statusLabel}${row.data.version ? ` (v${row.data.version})` : ""}`}
            />

            {previewLink ? (
                <IconButton
                    onClick={openInNewTab}
                    icon={<NewTab />}
                    title={"Preview in new tab"}
                    size={"sm"}
                    variant={"ghost"}
                />
            ) : null}
        </div>
    );
};
