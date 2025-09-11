import { makeAutoObservable } from "mobx";
import type { ISearchItemsUseCase } from "./ISearchItemsUseCase";
import type { ISearchRepository } from "~/Domain/Repositories";

export class SearchItemsUseCase implements ISearchItemsUseCase {
    private searchRepository: ISearchRepository;

    constructor(searchRepository: ISearchRepository) {
        this.searchRepository = searchRepository;
        makeAutoObservable(this);
    }

    async execute(query: string) {
        await this.searchRepository.set(query);
    }
}
