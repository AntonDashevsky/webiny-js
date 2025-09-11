import React from "react";
import { TimeAgo } from "@webiny/admin-ui";
import { RedirectListConfig } from "~/modules/redirects/configs/index.js";

export const CellModified = () => {
    const { useTableRow } = RedirectListConfig.Browser.Table.Column;
    const { row } = useTableRow();

    return <TimeAgo datetime={row.data.savedOn} />;
};
