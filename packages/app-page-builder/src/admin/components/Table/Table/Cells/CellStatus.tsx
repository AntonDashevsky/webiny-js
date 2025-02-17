import React from "react";
import { statuses } from "~/admin/constants/index.js";
import { PageListConfig } from "~/admin/config/pages/index.js";

export const CellStatus = () => {
    const { useTableRow, isFolderRow } = PageListConfig.Browser.Table.Column;
    const { row } = useTableRow();

    if (isFolderRow(row)) {
        return <>{"-"}</>;
    }

    return (
        <>{`${statuses[row.data.status]}${row.data.version ? ` (v${row.data.version})` : ""}`}</>
    );
};
