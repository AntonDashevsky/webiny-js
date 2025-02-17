import { makeAutoObservable } from "mobx";
import { ISearchRepository } from "./ISearchRepository.js";

export class SearchRepository implements ISearchRepository {
    private query = "";

    constructor() {
        makeAutoObservable(this);
    }

    get() {
        return this.query;
    }

    async set(query: string) {
        this.query = query;
    }
}
