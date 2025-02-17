import React from "react";
import { TimeAgo } from "@webiny/ui/TimeAgo/index.js";
import { PageListConfig } from "~/admin/config/pages/index.js";

export const CellModified = () => {
    const { useTableRow } = PageListConfig.Browser.Table.Column;
    const { row } = useTableRow();

    return <TimeAgo datetime={row.savedOn} />;
};
