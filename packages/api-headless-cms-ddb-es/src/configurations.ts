import { type CmsModel } from "@webiny/api-headless-cms/types/index.js";
import WebinyError from "@webiny/error";
import { type CmsContext } from "~/types.js";
import {
    getElasticsearchIndexPrefix,
    getLastAddedIndexPlugin,
    isSharedElasticsearchIndex
} from "@webiny/api-elasticsearch";
import { type ElasticsearchIndexRequestBody } from "@webiny/api-elasticsearch/types.js";
import { CmsEntryElasticsearchIndexPlugin } from "~/plugins/index.js";

interface ConfigurationsElasticsearch {
    index: string;
}

export interface CmsElasticsearchParams {
    model: Pick<CmsModel, "tenant" | "locale" | "modelId">;
}

export interface ConfigurationsIndexSettingsParams {
    context: CmsContext;
    model: Pick<CmsModel, "locale">;
}

export interface Configurations {
    es: (params: CmsElasticsearchParams) => ConfigurationsElasticsearch;
    indexSettings: (
        params: ConfigurationsIndexSettingsParams
    ) => Partial<ElasticsearchIndexRequestBody>;
}

export const configurations: Configurations = {
    es({ model }) {
        const { tenant, locale } = model;

        if (!tenant) {
            throw new WebinyError(
                `Missing "tenant" parameter when trying to create Elasticsearch index name.`,
                "TENANT_ERROR"
            );
        } else if (!locale) {
            throw new WebinyError(
                `Missing "locale" parameter when trying to create Elasticsearch index name.`,
                "LOCALE_ERROR"
            );
        }

        const sharedIndex = isSharedElasticsearchIndex();
        const index = [sharedIndex ? "root" : tenant, "headless-cms", locale, model.modelId]
            .join("-")
            .toLowerCase();

        const prefix = getElasticsearchIndexPrefix();

        if (!prefix) {
            return {
                index
            };
        }
        return {
            index: prefix + index
        };
    },
    indexSettings: ({ context, model }) => {
        const plugin = getLastAddedIndexPlugin<CmsEntryElasticsearchIndexPlugin>({
            container: context.plugins,
            type: CmsEntryElasticsearchIndexPlugin.type,
            locale: model.locale
        });

        return plugin ? plugin.body : {};
    }
};
