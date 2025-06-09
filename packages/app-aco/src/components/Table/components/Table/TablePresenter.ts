import { type Sorting } from "@webiny/ui/DataTable/index.js";

export interface TablePresenterViewModel {
    initialSorting: Sorting;
}

export interface ITablePresenter {
    get vm(): TablePresenterViewModel;
}

export class TablePresenter implements ITablePresenter {
    get vm() {
        return {
            initialSorting: [
                {
                    id: "savedOn",
                    desc: true
                }
            ]
        };
    }
}
