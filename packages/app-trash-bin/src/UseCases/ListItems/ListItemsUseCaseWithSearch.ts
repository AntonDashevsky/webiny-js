import { makeAutoObservable } from "mobx";
import type { ISearchRepository } from "~/Domain";
import type { IListItemsUseCase } from "./IListItemsUseCase";
import type { TrashBinListQueryVariables } from "~/types";

export class ListItemsUseCaseWithSearch implements IListItemsUseCase {
    private searchRepository: ISearchRepository;
    private useCase: IListItemsUseCase;

    constructor(searchRepository: ISearchRepository, useCase: IListItemsUseCase) {
        this.searchRepository = searchRepository;
        this.useCase = useCase;
        makeAutoObservable(this);
    }

    async execute(params?: TrashBinListQueryVariables) {
        const search = this.searchRepository.get();
        await this.useCase.execute({ ...params, search: search || undefined });
    }
}
