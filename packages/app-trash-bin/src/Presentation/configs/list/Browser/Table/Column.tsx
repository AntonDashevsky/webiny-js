import React from "react";
import { CompositionScope } from "@webiny/react-composition";
import { AcoConfig, type TableColumnConfig as ColumnConfig } from "@webiny/app-aco";
import { TrashBinItemDTO } from "~/Domain/index.js";

const { Table } = AcoConfig;

export type { ColumnConfig };

type ColumnProps = React.ComponentProps<typeof AcoConfig.Table.Column>;

const BaseColumn = (props: ColumnProps) => {
    return (
        <CompositionScope name={"trash"}>
            <AcoConfig>
                <Table.Column {...props} />
            </AcoConfig>
        </CompositionScope>
    );
};

export const Column = Object.assign(BaseColumn, {
    useTableRow: Table.Column.createUseTableRow<TrashBinItemDTO>(),
    isFolderRow: Table.Column.isFolderRow
});
