import React from "react";
import { TimeAgo } from "@webiny/admin-ui";
import { RedirectListConfig } from "~/modules/redirects/configs";

const { useTableRow } = RedirectListConfig.Browser.Table.Column;

export const CellCreated = () => {
    const { row } = useTableRow();

    return <TimeAgo datetime={row.createdOn} />;
};
