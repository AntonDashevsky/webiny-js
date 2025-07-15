import { makeAutoObservable, runInAction, toJS } from "mobx";
import unionBy from "lodash/unionBy";
import type { IListCache, IListCacheItemUpdater, IListCachePredicate } from "./IListCache";

export type Constructor<T> = new (...args: any[]) => T;

export class ListCache<T> implements IListCache<T> {
    private state: T[];
    private key: string;

    constructor(key: string) {
        this.key = key;
        this.state = [];

        makeAutoObservable(this);
    }

    count() {
        return this.state.length;
    }

    clear() {
        runInAction(() => {
            this.state = [];
        });
    }

    hasItems() {
        return this.state.length > 0;
    }

    getItems() {
        return [...this.state.map(item => toJS(item))];
    }

    getItem(predicate: IListCachePredicate<T>): T | undefined {
        const item = this.state.find(item => predicate(item));

        return item ? toJS(item) : undefined;
    }

    addItems(items: T[]) {
        runInAction(() => {
            this.state = unionBy(this.state, items, this.key);
        });
    }

    updateItems(updater: IListCacheItemUpdater<T>) {
        runInAction(() => {
            this.state = [...this.state.map(item => updater(item))];
        });
    }

    removeItems(predicate: IListCachePredicate<T>) {
        runInAction(() => {
            this.state = this.state.filter(item => !predicate(item));
        });
    }
}
