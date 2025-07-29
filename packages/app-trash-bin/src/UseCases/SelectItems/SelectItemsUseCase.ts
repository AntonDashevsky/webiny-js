import { makeAutoObservable } from "mobx";
import type { TrashBinItem, ISelectedItemsRepository } from "~/Domain";
import type { ISelectItemsUseCase } from "./ISelectItemsUseCase";

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
