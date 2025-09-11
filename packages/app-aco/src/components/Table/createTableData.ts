import type { FolderTableRow, RecordTableRow } from "~/table.types.js";
import type { FolderItem } from "~/types.js";

export const createRecordsData = <T extends { id: string }>(items: T[]): RecordTableRow<T>[] => {
    return items.map(item => ({
        id: item.id,
        $type: "RECORD",
        $selectable: true,
        data: item
    }));
};

export const createFoldersData = (items: FolderItem[]): FolderTableRow[] => {
    return items.map(item => ({
        id: item.id,
        $type: "FOLDER",
        $selectable: false,
        data: item
    }));
};
