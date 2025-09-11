import React from "react";
import { TimeAgo } from "@webiny/admin-ui";
import { RedirectListConfig } from "~/modules/redirects/configs/index.js";

const { useTableRow } = RedirectListConfig.Browser.Table.Column;

export const CellCreated = () => {
    const { row } = useTableRow();

    return <TimeAgo datetime={row.data.createdOn} />;
};
