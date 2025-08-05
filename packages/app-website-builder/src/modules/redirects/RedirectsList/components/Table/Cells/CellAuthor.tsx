import React from "react";
import { RedirectListConfig } from "~/modules/redirects/configs";

export const CellAuthor = () => {
    const { useTableRow } = RedirectListConfig.Browser.Table.Column;
    const { row } = useTableRow();

    return <>{row.data.createdBy.displayName}</>;
};
