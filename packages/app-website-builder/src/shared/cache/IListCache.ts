export interface IListCachePredicate<T> {
    (item: T): boolean;
}

export interface IListCacheItemUpdater<T> {
    (item: T): T;
}

export interface IListCache<T> {
    count(): number;
    clear(): void;
    hasItems(): boolean;
    getItems(): T[];
    getItem(predicate: IListCachePredicate<T>): T | undefined;
    addItems(items: T[]): void;
    updateItems(updater: IListCacheItemUpdater<T>): void;
    removeItems(predicate: IListCachePredicate<T>): void;
}
