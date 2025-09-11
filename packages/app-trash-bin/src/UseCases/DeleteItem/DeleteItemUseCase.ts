import { makeAutoObservable } from "mobx";
import type { ITrashBinItemsRepository } from "~/Domain/Repositories/index.js";
import type { IDeleteItemUseCase } from "./IDeleteItemUseCase.js";

export class DeleteItemUseCase implements IDeleteItemUseCase {
    private repository: ITrashBinItemsRepository;

    constructor(repository: ITrashBinItemsRepository) {
        this.repository = repository;
        makeAutoObservable(this);
    }

    async execute(id: string) {
        await this.repository.deleteItem(id);
    }
}
