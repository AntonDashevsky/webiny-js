import React from "react";
import { AcoConfig, type TableColumnConfig as ColumnConfig } from "@webiny/app-aco";
import { makeDecoratable } from "@webiny/react-composition";
import type { TableRowDto } from "~/modules/redirects/RedirectsList/presenters/TableRowMapper";

const { Table } = AcoConfig;

export type { ColumnConfig };

type ColumnProps = React.ComponentProps<typeof AcoConfig.Table.Column>;

const BaseColumnComponent = (props: ColumnProps) => {
    return (
        <AcoConfig>
            <Table.Column {...props} />
        </AcoConfig>
    );
};

const BaseColumn = makeDecoratable("Column", BaseColumnComponent);

const isFolderRow = (row: TableRowDto): row is Extract<TableRowDto, { $type: "FOLDER" }> => {
    return row.$type === "FOLDER";
};

export const Column = Object.assign(BaseColumn, {
    useTableRow: Table.Column.createUseTableRow<TableRowDto>(),
    useFolderRow: Table.Column.createUseTableRow<Extract<TableRowDto, { $type: "FOLDER" }>>(),
    useRedirectRow: Table.Column.createUseTableRow<Extract<TableRowDto, { $type: "RECORD" }>>(),
    isFolderRow
});
