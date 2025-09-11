import type { ColumnConfig } from "./Column";
import { Column } from "./Column";
import type { SortingConfig } from "./Sorting";
import { Sorting } from "./Sorting";

export interface TableConfig {
    columns: ColumnConfig[];
    sorting: SortingConfig[];
}

export const Table = {
    Column,
    Sorting
};
