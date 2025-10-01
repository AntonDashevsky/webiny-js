import type {
    CmsEntry,
    CmsEntryListParams,
    CmsEntryMeta
} from "@webiny/api-headless-cms/types/index.js";

export interface IListEntries {
    execute: (
        modelId: string,
        params: CmsEntryListParams
    ) => Promise<{ entries: CmsEntry[]; meta: CmsEntryMeta }>;
}
