import type { ColumnConfig } from "./Column";
import { Column } from "./Column";
import type { ThumbnailConfig } from "./Thumbnail";
import { Thumbnail } from "./Thumbnail";

export interface TableConfig {
    columns: ColumnConfig[];
    cellThumbnails: ThumbnailConfig[];
}

export const Table = {
    Column,
    Cell: {
        Thumbnail
    }
};
