import type { ColumnSorting } from "@webiny/app-utils";
import type { TrashBinItemDTO } from "~/Domain";
import type { TrashBinMetaResponse } from "~/types";

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
