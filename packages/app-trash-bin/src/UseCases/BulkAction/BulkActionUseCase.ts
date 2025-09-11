import { makeAutoObservable } from "mobx";
import type { ITrashBinItemsRepository } from "~/Domain/Repositories";
import type { IBulkActionUseCase } from "./IBulkActionUseCase";
import type { TrashBinBulkActionsParams } from "~/types";

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
