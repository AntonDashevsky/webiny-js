import { StorageOpsId } from "./types.js";

export abstract class AbstractStorageOps {
    static readonly id: StorageOpsId;
    abstract readonly id: StorageOpsId;
    abstract readonly shortId: string;
    abstract readonly displayName: string;
}
