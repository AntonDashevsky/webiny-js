import { Column, ColumnConfig } from "./Column.js";
import { Sorting, SortingConfig } from "./Sorting.js";

export interface TableConfig {
    columns: ColumnConfig[];
    sorting: SortingConfig[];
}

export const Table = {
    Column,
    Sorting
};
