import React from "react";
import { AcoConfig, type TableColumnConfig as ColumnConfig } from "@webiny/app-aco";
import type { TableItem } from "~/types";

const { Table } = AcoConfig;

export type { ColumnConfig };

type ColumnProps = React.ComponentProps<typeof AcoConfig.Table.Column>;

const BaseColumn: React.FC<ColumnProps> = props => {
    return (
        <AcoConfig>
            <Table.Column {...props} />
        </AcoConfig>
    );
};

const isFolderRow = (row: TableItem): row is Extract<TableItem, { $type: "FOLDER" }> => {
    return row.$type === "FOLDER";
};

export const Column = Object.assign(BaseColumn, {
    useTableRow: Table.Column.createUseTableRow<TableItem>(),
    isFolderRow
});

Column["displayName"] = "Column";
