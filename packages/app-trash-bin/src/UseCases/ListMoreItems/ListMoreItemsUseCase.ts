import { makeAutoObservable } from "mobx";
import { ITrashBinItemsRepository } from "~/Domain/Repositories/index.js";
import { IListMoreItemsUseCase } from "./IListMoreItemsUseCase.js";

export class ListMoreItemsUseCase implements IListMoreItemsUseCase {
    private itemsRepository: ITrashBinItemsRepository;

    constructor(itemsRepository: ITrashBinItemsRepository) {
        this.itemsRepository = itemsRepository;
        makeAutoObservable(this);
    }

    async execute() {
        await this.itemsRepository.listMoreItems();
    }
}
