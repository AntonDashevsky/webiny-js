import { createTimeSearchPlugin } from "./timeSearch.js";
import { createRefSearchPlugin } from "./refSearch.js";
import { type CmsEntryElasticsearchQueryBuilderValueSearchPlugin } from "~/plugins/CmsEntryElasticsearchQueryBuilderValueSearchPlugin.js";

export default (): CmsEntryElasticsearchQueryBuilderValueSearchPlugin[] => [
    createTimeSearchPlugin(),
    createRefSearchPlugin()
];
