import { createTimeSearchPlugin } from "./timeSearch.js";
import { createRefSearchPlugin } from "./refSearch.js";
import { createSearchableJsonSearchPlugin } from "./searchableJson.js";
import type { CmsEntryElasticsearchQueryBuilderValueSearchPlugin } from "~/plugins/CmsEntryElasticsearchQueryBuilderValueSearchPlugin.js";

export default (): CmsEntryElasticsearchQueryBuilderValueSearchPlugin[] => [
    createTimeSearchPlugin(),
    createRefSearchPlugin(),
    createSearchableJsonSearchPlugin()
];
