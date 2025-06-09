import {
    type IBulkActionsController,
    type IDeleteItemController,
    type IGetRestoredItemByIdController,
    type IListItemsController,
    type IListMoreItemsController,
    type IRestoreItemController,
    type ISearchItemsController,
    type ISelectAllItemsController,
    type ISelectItemsController,
    type ISortItemsController,
    type IUnselectAllItemsController
} from "~/Presentation/TrashBin/controllers/index.js";

export interface ITrashBinControllers {
    deleteItem: IDeleteItemController;
    getRestoredItemById: IGetRestoredItemByIdController;
    restoreItem: IRestoreItemController;
    listMoreItems: IListMoreItemsController;
    listItems: IListItemsController;
    selectItems: ISelectItemsController;
    selectAllItems: ISelectAllItemsController;
    sortItems: ISortItemsController;
    searchItems: ISearchItemsController;
    unselectAllItems: IUnselectAllItemsController;
    restoreBulkAction: IBulkActionsController;
    deleteBulkAction: IBulkActionsController;
}
