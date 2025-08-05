import React from "react";
import { AcoConfig, type TableColumnConfig as ColumnConfig } from "@webiny/app-aco";
import type { TrashBinTableRow } from "~/Domain";

const { Table } = AcoConfig;

export type { ColumnConfig };

type ColumnProps = React.ComponentProps<typeof AcoConfig.Table.Column>;

const BaseColumn = (props: ColumnProps) => {
    return (
        <AcoConfig>
            <Table.Column {...props} />
        </AcoConfig>
    );
};

export const Column = Object.assign(BaseColumn, {
    useTableRow: Table.Column.createUseTableRow<TrashBinTableRow>(),
    isFolderRow: Table.Column.isFolderRow
});
