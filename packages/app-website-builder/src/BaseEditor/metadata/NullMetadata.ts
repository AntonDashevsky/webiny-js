import type { IMetadata, Metadata } from "./IMetadata";

export class NullMetadata implements IMetadata {
    applyToDocument(): void {}

    get<T extends Metadata = Metadata>(): T | undefined {
        return undefined;
    }

    set(): void {}

    unset(): void {}
}
