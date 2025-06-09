import type React from "react";
import { type Column as DataTableColumn } from "@webiny/ui/DataTable/index.js";
import { type Column, type ColumnDTO } from "./Column.js";

export class ColumnMapper {
    static toDTO(column: Column | ColumnDTO): ColumnDTO {
        return {
            cell: column.cell,
            className: column.className,
            header: column.header,
            hideable: column.hideable,
            name: column.name,
            resizable: column.resizable,
            size: column.size,
            sortable: column.sortable,
            visible: column.visible
        };
    }

    static toDataTable<T>(
        column: ColumnDTO,
        cellRenderer: (
            row: T,
            cell: string | React.ReactElement
        ) => string | number | JSX.Element | null
    ): DataTableColumn<T> {
        return {
            header: column.header,
            className: column.className,
            size: column.size,
            enableHiding: column.hideable,
            enableResizing: column.resizable,
            enableSorting: column.sortable,
            cell: column.cell ? (row: T) => cellRenderer(row, column.cell) : undefined
        };
    }
}
