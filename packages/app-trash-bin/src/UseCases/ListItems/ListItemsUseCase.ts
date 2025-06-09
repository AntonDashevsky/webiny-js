import { makeAutoObservable } from "mobx";
import { type ITrashBinItemsRepository } from "~/Domain/index.js";
import { type IListItemsUseCase } from "./IListItemsUseCase.js";
import { type TrashBinListQueryVariables } from "~/types.js";

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
