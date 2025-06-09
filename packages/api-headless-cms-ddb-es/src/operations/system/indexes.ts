import { type CmsContext } from "~/types.js";
import { type PluginsContainer } from "@webiny/plugins";
import { type Client } from "@elastic/elasticsearch";
import { createElasticsearchIndex } from "~/elasticsearch/createElasticsearchIndex.js";

interface Params {
    context: CmsContext;
    client: Client;
    plugins: PluginsContainer;
}

export const createElasticsearchIndexesOnLocaleAfterCreate = async (params: Params) => {
    const { context, client, plugins } = params;

    context.i18n.locales.onLocaleAfterCreate.subscribe(async ({ locale, tenant }) => {
        /**
         * Get all the code models and create the indexes for them.
         */
        const models = await context.security.withoutAuthorization(async () => {
            return (await context.cms.listModels()).map(model => {
                return {
                    ...model,
                    tenant,
                    locale: locale.code
                };
            });
        });

        for (const model of models) {
            await createElasticsearchIndex({
                client,
                plugins,
                model
            });
        }
    });
};
