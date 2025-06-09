import { makeAutoObservable } from "mobx";
import { type TrashBinItem } from "~/Domain/index.js";
import { type ISelectedItemsRepository } from "./ISelectedItemsRepository.js";

export class SelectedItemsRepository implements ISelectedItemsRepository {
    private items: TrashBinItem[] = [];
    private selectedAll = false;

    constructor() {
        makeAutoObservable(this);
    }

    getSelectedItems() {
        return this.items;
    }

    getSelectedAllItems() {
        return this.selectedAll;
    }

    async selectItems(items: TrashBinItem[]) {
        this.items = items;
        this.selectedAll = false;
    }

    async selectAllItems() {
        this.selectedAll = true;
    }

    async unselectAllItems() {
        this.items = [];
        this.selectedAll = false;
    }
}
