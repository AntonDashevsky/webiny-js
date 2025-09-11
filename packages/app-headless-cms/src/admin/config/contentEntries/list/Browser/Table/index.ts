import type { ColumnConfig } from "./Column";
import { Column } from "./Column";

export interface TableConfig {
    columns: ColumnConfig[];
}

export const Table = {
    Column
};
