import { Column, type ColumnConfig } from "./Column.js";
import { Sorting, type SortingConfig } from "./Sorting.js";

export interface TableConfig {
    columns: ColumnConfig[];
    sorting: SortingConfig[];
}

export const Table = {
    Column,
    Sorting
};
