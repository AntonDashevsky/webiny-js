import { getBaseConfiguration } from "@webiny/api-elasticsearch";
import { CmsEntryElasticsearchIndexPlugin } from "~/plugins/CmsEntryElasticsearchIndexPlugin.js";

export const base = new CmsEntryElasticsearchIndexPlugin({
    body: getBaseConfiguration()
});
