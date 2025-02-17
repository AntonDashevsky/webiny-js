import { Meta } from "@webiny/app-utils";
import { TrashBinItem } from "~/Domain/index.js";
import { TrashBinBulkActionsParams, TrashBinListQueryVariables } from "~/types.js";

export interface ITrashBinItemsRepository {
    listItems: (params?: TrashBinListQueryVariables) => Promise<void>;
    listMoreItems: () => Promise<void>;
    deleteItem: (id: string) => Promise<void>;
    restoreItem: (id: string) => Promise<void>;
    bulkAction: (action: string, params: TrashBinBulkActionsParams) => Promise<void>;
    getItems: () => TrashBinItem[];
    getRestoredItems: () => TrashBinItem[];
    getMeta: () => Meta;
    getLoading: () => Record<string, any>;
}
