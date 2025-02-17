import { makeAutoObservable } from "mobx";
import { ITrashBinItemsRepository } from "~/Domain/index.js";
import { IListItemsUseCase } from "./IListItemsUseCase.js";
import { TrashBinListQueryVariables } from "~/types.js";

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
