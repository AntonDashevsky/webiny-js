import React from "react";
import { TimeAgo } from "@webiny/admin-ui";
import { PageListConfig } from "~/modules/pages/configs";

export const CellModified = () => {
    const { useTableRow } = PageListConfig.Browser.Table.Column;
    const { row } = useTableRow();

    return <TimeAgo datetime={row.savedOn} />;
};
