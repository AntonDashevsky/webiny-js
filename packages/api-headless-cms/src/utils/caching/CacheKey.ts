import type { ICacheKey } from "./types.js";
import type { ICacheKeyKeys } from "@webiny/utils";
import { createCacheKey as createCacheKeyValue } from "@webiny/utils";

class CacheKey implements ICacheKey {
    private readonly key: string;
    public readonly keys: ICacheKeyKeys;

    private constructor(keys: ICacheKeyKeys) {
        this.keys = keys;
        this.key = createCacheKeyValue(keys);
    }

    public static create(key: ICacheKeyKeys): ICacheKey {
        return new CacheKey(key);
    }

    public get(): string {
        return this.key;
    }
}

export const createCacheKey = (key: ICacheKeyKeys) => {
    return CacheKey.create(key);
};
