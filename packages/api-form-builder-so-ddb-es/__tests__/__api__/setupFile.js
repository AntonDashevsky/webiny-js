import dbPlugins from "@webiny/handler-db";
import { DynamoDbDriver } from "@webiny/db-dynamodb";
import { getDocumentClient } from "@webiny/project-utils/testing/dynamodb/index.js";
import { createFormBuilderStorageOperations } from "../../dist";
import { configurations } from "../../dist/configurations.js";
import { base as baseConfigurationPlugin } from "../../dist/elasticsearch/indices/base.js";
import { setStorageOps } from "@webiny/project-utils/testing/environment/index.js";
import { getElasticsearchClient } from "@webiny/project-utils/testing/elasticsearch/index.js";
import { getElasticsearchIndexPrefix } from "@webiny/api-elasticsearch";

const prefix = getElasticsearchIndexPrefix();
if (!prefix.includes("api-")) {
    process.env.ELASTIC_SEARCH_INDEX_PREFIX = `${prefix}api-form-builder-env-`;
}

setStorageOps("formBuilder", () => {
    const documentClient = getDocumentClient();
    const { elasticsearchClient, plugins } = getElasticsearchClient({
        name: "api-form-builder-so-ddb-es",
        prefix: "api-form-builder-env-",
        onBeforeEach: async () => {
            const { index } = configurations.es({
                locale: "en-US",
                tenant: "root"
            });
            await elasticsearchClient.indices.create({
                index,
                body: {
                    ...baseConfigurationPlugin.body
                }
            });
        }
    });

    return {
        storageOperations: createFormBuilderStorageOperations({
            documentClient,
            elasticsearch: elasticsearchClient
        }),
        plugins: [
            ...plugins,
            ...dbPlugins({
                table: process.env.DB_TABLE,
                driver: new DynamoDbDriver({
                    documentClient
                })
            })
            // ...dynamoDbPlugins()
        ]
    };
});
