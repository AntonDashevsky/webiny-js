import { makeAutoObservable } from "mobx";
import type { ISelectedItemsRepository } from "~/Domain";
import type { ISelectAllItemsUseCase } from "./ISelectAllItemsUseCase";

export class SelectAllItemsUseCase implements ISelectAllItemsUseCase {
    private repository: ISelectedItemsRepository;

    constructor(repository: ISelectedItemsRepository) {
        this.repository = repository;
        makeAutoObservable(this);
    }

    async execute() {
        await this.repository.selectAllItems();
    }
}
