import { makeAutoObservable } from "mobx";
import { type ITrashBinItemsRepository } from "~/Domain/index.js";
import { type IGetRestoredItemUseCase } from "./IGetRestoredItemUseCase.js";

export class GetRestoredItemUseCase implements IGetRestoredItemUseCase {
    private repository: ITrashBinItemsRepository;

    constructor(repository: ITrashBinItemsRepository) {
        this.repository = repository;
        makeAutoObservable(this);
    }

    async execute(id: string) {
        const items = this.repository.getRestoredItems();
        return items.find(item => item.id === id);
    }
}
