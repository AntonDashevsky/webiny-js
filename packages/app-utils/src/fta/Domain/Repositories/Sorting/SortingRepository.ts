import { makeAutoObservable } from "mobx";
import { ISortingRepository } from "./ISortingRepository.js";
import { Sorting } from "~/fta/Domain/Models/index.js";

export class SortingRepository implements ISortingRepository {
    private sorting: Sorting[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    get() {
        return this.sorting;
    }

    set(sorts: Sorting[]) {
        this.sorting = sorts;
    }
}
