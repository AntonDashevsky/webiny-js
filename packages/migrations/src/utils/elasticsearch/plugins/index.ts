import { ElasticsearchIndexRequestBody } from "@webiny/api-elasticsearch/types.js";

import { base } from "./base.js";
import { japanese } from "./japanese.js";

export interface ElasticsearchIndexPlugins {
    body: ElasticsearchIndexRequestBody;
    locales?: string[];
}

export const elasticsearchIndexPlugins = (): ElasticsearchIndexPlugins[] => {
    return [base, japanese];
};
