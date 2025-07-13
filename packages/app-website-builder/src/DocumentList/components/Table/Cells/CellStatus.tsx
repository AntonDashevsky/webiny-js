import React, { useMemo } from "react";
import { Tag } from "@webiny/admin-ui";
import { PageListConfig } from "~/configs/index.js";
import { toTitleCaseLabel } from "~/shared/toTitleCaseLabel";

export const CellStatus = () => {
    const { useTableRow, isFolderRow } = PageListConfig.Browser.Table.Column;
    const { row } = useTableRow();

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

    return (
        <Tag
            variant={variant}
            content={`${statusLabel}${row.data.version ? ` (v${row.data.version})` : ""}`}
        />
    );
};
