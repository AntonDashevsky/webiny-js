import { makeAutoObservable } from "mobx";
import type { ISelectedItemsRepository } from "~/Domain";
import type { IUnselectAllItemsUseCase } from "./IUnselectAllItemsUseCase";

export class UnselectAllItemsUseCase implements IUnselectAllItemsUseCase {
    private repository: ISelectedItemsRepository;

    constructor(repository: ISelectedItemsRepository) {
        this.repository = repository;
        makeAutoObservable(this);
    }

    async execute() {
        await this.repository.unselectAllItems();
    }
}
