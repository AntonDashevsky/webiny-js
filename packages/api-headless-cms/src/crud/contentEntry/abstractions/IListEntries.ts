import { type CmsEntry, type CmsEntryListParams, type CmsEntryMeta, type CmsEntryValues, type CmsModel } from "~/types/index.js";

export interface IListEntries {
    execute: <T extends CmsEntryValues>(
        model: CmsModel,
        params?: CmsEntryListParams
    ) => Promise<[CmsEntry<T>[], CmsEntryMeta]>;
}
