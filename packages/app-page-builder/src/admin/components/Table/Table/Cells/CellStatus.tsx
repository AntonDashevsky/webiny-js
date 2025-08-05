import React from "react";
import { statuses } from "~/admin/constants";
import { PageListConfig } from "~/admin/config/pages";

export const CellStatus = () => {
    const { useTableRow, isFolderRow } = PageListConfig.Browser.Table.Column;
    const { row } = useTableRow();

    if (isFolderRow(row)) {
        return <>{"-"}</>;
    }

    return (
        <>{`${statuses[row.data.data.status]}${
            row.data.data.version ? ` (v${row.data.data.version})` : ""
        }`}</>
    );
};
