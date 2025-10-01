import type {
    CmsStorageEntry,
    StorageOperationsCmsModel
} from "@webiny/api-headless-cms/types/index.js";

interface ConvertStorageEntryParams {
    entry: CmsStorageEntry;
    model: StorageOperationsCmsModel;
}
export const convertEntryKeysToStorage = (params: ConvertStorageEntryParams): CmsStorageEntry => {
    const { model, entry } = params;

    const values = model.convertValueKeyToStorage({
        fields: model.fields,
        values: entry.values
    });
    return {
        ...entry,
        values
    };
};

export const convertEntryKeysFromStorage = (params: ConvertStorageEntryParams): CmsStorageEntry => {
    const { model, entry } = params;

    const values = model.convertValueKeyFromStorage({
        fields: model.fields,
        values: entry.values
    });
    return {
        ...entry,
        values
    };
};
