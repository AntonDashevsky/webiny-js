import React from "react";
import { statuses } from "~/admin/constants.js";
import { ContentEntryListConfig } from "~/admin/config/contentEntries/index.js";

export const CellStatus = () => {
    const { useTableRow, isFolderRow } = ContentEntryListConfig.Browser.Table.Column;
    const { row } = useTableRow();

    if (isFolderRow(row)) {
        return <>{"-"}</>;
    }

    return (
        <>{`${statuses[row.meta.status]}${row.meta.version ? ` (v${row.meta.version})` : ""}`}</>
    );
};
