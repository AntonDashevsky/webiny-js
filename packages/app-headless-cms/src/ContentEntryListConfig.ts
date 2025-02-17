import { ContentEntryListConfig as BaseContentEntryListConfig } from "./admin/config/contentEntries/index.js";
import { useContentEntriesList } from "./admin/hooks/index.js";
import { ContentEntries } from "~/admin/views/contentEntries/ContentEntries.js";

export const ContentEntryListConfig = Object.assign(BaseContentEntryListConfig, {
    ContentEntries: Object.assign(ContentEntries, {
        useContentEntriesList
    })
});
