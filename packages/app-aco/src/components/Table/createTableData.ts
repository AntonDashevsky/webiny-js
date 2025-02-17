import { FolderTableItem, RecordTableItem } from "~/table.types.js";
import { FolderItem } from "~/types.js";

type Result<T> = Array<RecordTableItem & T>;

export const createRecordsData = <T>(items: T[]): Result<T> => {
    return items.map(item => {
        return {
            $type: "RECORD",
            $selectable: true,
            ...item
        };
    });
};

export const createFoldersData = (items: FolderItem[]): FolderTableItem[] => {
    return items.map(item => ({
        $type: "FOLDER",
        $selectable: false,
        ...item
    }));
};
