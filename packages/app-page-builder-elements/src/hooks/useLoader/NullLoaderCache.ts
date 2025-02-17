import { ILoaderCache } from "./ILoaderCache.js";

export class NullLoaderCache implements ILoaderCache {
    read() {
        return null;
    }

    write() {
        return;
    }

    remove() {
        return;
    }

    clear() {
        return;
    }
}
