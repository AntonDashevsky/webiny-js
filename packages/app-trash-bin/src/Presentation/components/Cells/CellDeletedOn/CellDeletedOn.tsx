import React from "react";
import { TimeAgo } from "@webiny/ui/TimeAgo/index.js";
import { TrashBinListConfig } from "~/Presentation/configs/index.js";

export const CellDeletedOn = () => {
    const { useTableRow } = TrashBinListConfig.Browser.Table.Column;
    const { row } = useTableRow();

    return <TimeAgo datetime={row.deletedOn} />;
};
