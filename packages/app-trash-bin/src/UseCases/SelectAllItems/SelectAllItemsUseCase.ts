import { makeAutoObservable } from "mobx";
import { ISelectedItemsRepository } from "~/Domain/index.js";
import { ISelectAllItemsUseCase } from "./ISelectAllItemsUseCase.js";

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
