import type { IMetadata } from "./IMetadata.js";

export class NullMetadata implements IMetadata {
    applyToDocument(): void {}

    get<T = unknown>(): T | undefined {
        return undefined;
    }

    set(): void {}

    unset(): void {}
}
