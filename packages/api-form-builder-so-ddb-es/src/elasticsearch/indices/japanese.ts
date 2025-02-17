import { getJapaneseConfiguration } from "@webiny/api-elasticsearch";
import { FormElasticsearchIndexPlugin } from "~/plugins/FormElasticsearchIndexPlugin.js";

export const japanese = new FormElasticsearchIndexPlugin({
    body: getJapaneseConfiguration(),
    locales: ["ja", "ja-jp"]
});
