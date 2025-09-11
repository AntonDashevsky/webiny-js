import React from "react";
import {
    AcoConfig,
    type FolderTableRow,
    type RecordTableRow,
    type TableColumnConfig as ColumnConfig
} from "@webiny/app-aco";
import { makeDecoratable } from "@webiny/react-composition";
import type { TableRow } from "~/modules/redirects/RedirectsList/presenters/TableRowMapper.js";
import type { RedirectDto } from "~/domain/Redirect/index.js";

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

const isFolderRow = (row: TableRow): row is FolderTableRow => {
    return row.$type === "FOLDER";
};

export const Column = Object.assign(BaseColumn, {
    useTableRow: Table.Column.createUseTableRow<TableRow>(),
    useFolderRow: Table.Column.createUseTableRow<FolderTableRow>(),
    useRedirectRow: Table.Column.createUseTableRow<RecordTableRow<RedirectDto>>(),
    isFolderRow
});
