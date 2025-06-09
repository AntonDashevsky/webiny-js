import { type Folder } from "../Folder.js";
import { ListCache } from "~/features/folders/cache/ListCache.js";

export class FoldersCacheFactory {
    private cache: Map<string, ListCache<Folder>> = new Map();

    getCache(namespace: string) {
        const cacheKey = this.getCacheKey(namespace);

        if (!this.cache.has(cacheKey)) {
            this.cache.set(cacheKey, new ListCache<Folder>());
        }

        return this.cache.get(cacheKey) as ListCache<Folder>;
    }

    private getCacheKey(namespace: string) {
        return namespace;
    }
}

export const folderCacheFactory = new FoldersCacheFactory();
