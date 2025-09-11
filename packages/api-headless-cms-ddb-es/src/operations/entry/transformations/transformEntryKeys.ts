import type {
    CmsEntry,
    CmsStorageEntry,
    StorageOperationsCmsModel
} from "@webiny/api-headless-cms/types/index.js";
import { convertEntryKeysToStorage } from "./convertEntryKeys.js";

interface TransformKeysParams {
    model: StorageOperationsCmsModel;
    entry: CmsEntry;
    storageEntry: CmsStorageEntry;
}

export const transformEntryKeys = (params: TransformKeysParams) => {
    const { model, entry, storageEntry } = params;
    return {
        entry: convertEntryKeysToStorage({
            model,
            entry
        }),
        storageEntry: convertEntryKeysToStorage({
            model,
            entry: storageEntry
        })
    };
};
