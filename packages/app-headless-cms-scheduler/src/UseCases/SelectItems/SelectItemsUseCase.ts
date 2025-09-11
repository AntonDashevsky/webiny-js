import { makeAutoObservable } from "mobx";
import type { SchedulerItem, ISelectedItemsRepository } from "~/Domain";
import type { ISelectItemsUseCase } from "./ISelectItemsUseCase";

export class SelectItemsUseCase implements ISelectItemsUseCase {
    private repository: ISelectedItemsRepository;

    constructor(repository: ISelectedItemsRepository) {
        this.repository = repository;
        makeAutoObservable(this);
    }

    async execute(items: SchedulerItem[]) {
        await this.repository.selectItems(items);
    }
}
