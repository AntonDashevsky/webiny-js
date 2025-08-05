import type { FolderTableItem, RecordTableItem } from "~/table.types";
import type { FolderItem } from "~/types";

export const createRecordsData = <T extends { id: string }>(items: T[]): RecordTableItem<T>[] => {
    return items.map(item => ({
        id: item.id,
        $type: "RECORD",
        $selectable: true,
        data: item
    }));
};

export const createFoldersData = (items: FolderItem[]): FolderTableItem[] => {
    return items.map(item => ({
        id: item.id,
        $type: "FOLDER",
        $selectable: false,
        data: item
    }));
};
