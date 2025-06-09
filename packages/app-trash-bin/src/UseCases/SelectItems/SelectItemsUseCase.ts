import { makeAutoObservable } from "mobx";
import { type TrashBinItem, type ISelectedItemsRepository } from "~/Domain/index.js";
import { type ISelectItemsUseCase } from "./ISelectItemsUseCase.js";

export class SelectItemsUseCase implements ISelectItemsUseCase {
    private repository: ISelectedItemsRepository;

    constructor(repository: ISelectedItemsRepository) {
        this.repository = repository;
        makeAutoObservable(this);
    }

    async execute(items: TrashBinItem[]) {
        await this.repository.selectItems(items);
    }
}
