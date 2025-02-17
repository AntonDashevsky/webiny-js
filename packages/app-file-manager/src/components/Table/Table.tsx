import React, { forwardRef, useMemo } from "react";
import { createFoldersData, createRecordsData, Table as AcoTable } from "@webiny/app-aco";
import { OnSortingChange, Sorting } from "@webiny/ui/DataTable/index.js";
import { useFileManagerView } from "~/modules/FileManagerRenderer/FileManagerViewProvider/index.js";
import { TableItem } from "~/types.js";

export interface TableProps {
    onSelectRow: ((rows: TableItem[] | []) => void) | undefined;
    onToggleRow: ((row: TableItem) => void) | undefined;
    sorting: Sorting;
    onSortingChange: OnSortingChange;
}

export const Table = forwardRef<HTMLDivElement, TableProps>((props, ref) => {
    const view = useFileManagerView();

    const data = useMemo<TableItem[]>(() => {
        return [...createFoldersData(view.folders), ...createRecordsData(view.files)];
    }, [view.folders, view.files]);

    return (
        <div ref={ref}>
            <AcoTable<TableItem>
                data={data}
                loading={view.isListLoading}
                onSelectRow={props.onSelectRow}
                onToggleRow={props.onToggleRow}
                sorting={props.sorting}
                onSortingChange={props.onSortingChange}
                selected={view.selected}
                namespace={"fm.file"}
            />
        </div>
    );
});

Table.displayName = "Table";
