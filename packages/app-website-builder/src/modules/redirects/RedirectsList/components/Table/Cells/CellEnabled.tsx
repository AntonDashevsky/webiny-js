import React from "react";
import { Tag } from "@webiny/admin-ui";
import { RedirectListConfig } from "~/modules/redirects/configs";

const { useTableRow, isFolderRow } = RedirectListConfig.Browser.Table.Column;

export const CellEnabled = () => {
    const { row } = useTableRow();

    if (isFolderRow(row)) {
        return <>{"-"}</>;
    }

    const { isEnabled } = row.data;

    return (
        <div className={"wby-flex wby-items-center"}>
            <Tag
                variant={isEnabled ? "success" : "neutral-light"}
                content={isEnabled ? "Enabled" : "Disabled"}
            />
        </div>
    );
};
