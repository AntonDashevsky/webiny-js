import React from "react";
import { TimeAgo } from "@webiny/ui/TimeAgo/index.js";
import { ContentEntryListConfig } from "~/admin/config/contentEntries/index.js";

export const CellModified = () => {
    const { useTableRow } = ContentEntryListConfig.Browser.Table.Column;
    const { row } = useTableRow();

    return <TimeAgo datetime={row.savedOn} />;
};
