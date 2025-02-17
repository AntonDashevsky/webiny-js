import { getJapaneseConfiguration } from "@webiny/api-elasticsearch";
import { PageElasticsearchIndexPlugin } from "~/plugins/definitions/PageElasticsearchIndexPlugin.js";

export const japanese = new PageElasticsearchIndexPlugin({
    body: getJapaneseConfiguration(),
    locales: ["ja", "ja-jp"]
});

japanese.name = "pageBuilder.elasticsearch.index.page.ja-jp";
