import { OnSortingChange } from "@webiny/ui/DataTable/index.js";
import { ColumnSorting, SortingMapper } from "@webiny/app-utils";
import { IListItemsUseCase, ISortItemsUseCase } from "~/UseCases/index.js";
import { ISortItemsController } from "./ISortItemsController.js";

export class SortItemsController implements ISortItemsController {
    private listItemsUseCaseFactory: () => IListItemsUseCase;
    private sortItemsUseCaseFactory: () => ISortItemsUseCase;

    constructor(
        listItemsUseCaseFactory: () => IListItemsUseCase,
        sortItemsUseCaseFactory: () => ISortItemsUseCase
    ) {
        this.listItemsUseCaseFactory = listItemsUseCaseFactory;
        this.sortItemsUseCaseFactory = sortItemsUseCaseFactory;
    }

    public execute: OnSortingChange = async updaterOrValue => {
        let newSorts: ColumnSorting[] = [];

        if (typeof updaterOrValue === "function") {
            newSorts = updaterOrValue(newSorts || []);
        }

        const sortItemsUseCase = this.sortItemsUseCaseFactory();
        const listItemsUseCase = this.listItemsUseCaseFactory();

        await sortItemsUseCase.execute(newSorts.map(sort => SortingMapper.fromColumnToDTO(sort)));
        await listItemsUseCase.execute();
    };
}
