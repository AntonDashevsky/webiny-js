import { makeAutoObservable } from "mobx";
import { ITrashBinItemsRepository } from "~/Domain/Repositories/index.js";
import { IBulkActionUseCase } from "./IBulkActionUseCase.js";
import { TrashBinBulkActionsParams } from "~/types.js";

export class BulkActionUseCase implements IBulkActionUseCase {
    private repository: ITrashBinItemsRepository;

    constructor(repository: ITrashBinItemsRepository) {
        this.repository = repository;
        makeAutoObservable(this);
    }

    async execute(action: string, params: TrashBinBulkActionsParams) {
        await this.repository.bulkAction(action, params);
    }
}
