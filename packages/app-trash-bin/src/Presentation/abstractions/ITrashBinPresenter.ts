import { type ColumnSorting } from "@webiny/app-utils";
import { type TrashBinItemDTO } from "~/Domain/index.js";
import { type TrashBinMetaResponse } from "~/types.js";

export interface TrashBinPresenterViewModel {
    items: TrashBinItemDTO[];
    restoredItems: TrashBinItemDTO[];
    selectedItems: TrashBinItemDTO[];
    allowSelectAll: boolean;
    isSelectedAll: boolean;
    sorting: ColumnSorting[];
    loading: Record<string, boolean>;
    isEmptyView: boolean;
    isSearchView: boolean;
    meta: TrashBinMetaResponse;
    searchQuery: string | undefined;
    searchLabel: string;
    nameColumnId: string;
    retentionPeriod: string;
}

export interface ITrashBinPresenter {
    get vm(): TrashBinPresenterViewModel;
}
