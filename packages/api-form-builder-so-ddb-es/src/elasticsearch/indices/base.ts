import { FormElasticsearchIndexPlugin } from "~/plugins/FormElasticsearchIndexPlugin.js";
import { getBaseConfiguration } from "@webiny/api-elasticsearch";

export const base = new FormElasticsearchIndexPlugin({
    body: getBaseConfiguration()
});
