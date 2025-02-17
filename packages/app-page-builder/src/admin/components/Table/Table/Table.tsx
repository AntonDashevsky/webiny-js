import React, { ForwardRefRenderFunction, useMemo } from "react";

import { createFoldersData, createRecordsData, Table as AcoTable } from "@webiny/app-aco";
import { usePagesList } from "~/admin/views/Pages/hooks/usePagesList.js";

import { TableContainer } from "./styled.js";
import { TableItem } from "~/types.js";

const BaseTable: ForwardRefRenderFunction<HTMLDivElement> = (_, ref) => {
    const list = usePagesList();

    const data = useMemo<TableItem[]>(() => {
        return [...createFoldersData(list.folders), ...createRecordsData(list.records)];
    }, [list.folders, list.records]);

    return (
        <TableContainer ref={ref}>
            <AcoTable<TableItem>
                data={data}
                loading={list.isListLoading}
                onSelectRow={list.onSelectRow}
                sorting={list.sorting}
                onSortingChange={list.setSorting}
                selected={list.selected}
                namespace={"pb.page"}
            />
        </TableContainer>
    );
};

export const Table = React.forwardRef<HTMLDivElement>(BaseTable);
Table.displayName = "Table";
