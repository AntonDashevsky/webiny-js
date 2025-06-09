import { type TrashBinItem } from "~/Domain/index.js";

export interface ISelectedItemsRepository {
    selectItems: (items: TrashBinItem[]) => Promise<void>;
    selectAllItems: () => Promise<void>;
    unselectAllItems: () => Promise<void>;
    getSelectedItems: () => TrashBinItem[];
    getSelectedAllItems: () => boolean;
}
