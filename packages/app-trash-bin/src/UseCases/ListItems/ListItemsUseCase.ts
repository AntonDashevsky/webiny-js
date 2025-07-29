import { makeAutoObservable } from "mobx";
import type { ITrashBinItemsRepository } from "~/Domain";
import type { IListItemsUseCase } from "./IListItemsUseCase";
import type { TrashBinListQueryVariables } from "~/types";

export class ListItemsUseCase implements IListItemsUseCase {
    private itemsRepository: ITrashBinItemsRepository;
    constructor(itemsRepository: ITrashBinItemsRepository) {
        this.itemsRepository = itemsRepository;
        makeAutoObservable(this);
    }

    async execute(params?: TrashBinListQueryVariables) {
        await this.itemsRepository.listItems({ ...params });
    }
}
