import { flushCacheOnFileUpdate } from "~/flushCdnCache/flushCacheOnFileUpdate.js";
import { flushCacheOnFileDelete } from "~/flushCdnCache/flushCacheOnFileDelete.js";
import { createInvalidateCacheTask } from "./invalidateCacheTaskDefinition.js";

export const flushCdnCache = () => {
    return [flushCacheOnFileUpdate(), flushCacheOnFileDelete(), createInvalidateCacheTask()];
};
