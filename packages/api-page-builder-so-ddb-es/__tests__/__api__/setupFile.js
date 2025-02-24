import dbPlugins from "@webiny/handler-db";
import { DynamoDbDriver } from "@webiny/db-dynamodb";
import { getDocumentClient } from "@webiny/project-utils/testing/dynamodb/index.js";
import { setStorageOps } from "@webiny/project-utils/testing/environment/index.js";
import { logger } from "@webiny/project-utils/testing/logger.js";
import { getElasticsearchClient } from "@webiny/project-utils/testing/elasticsearch/index.js";
import { createStorageOperations } from "@webiny/api-page-builder-so-ddb-es";
import { configurations } from "@webiny/api-page-builder-so-ddb-es/configurations.js";
import { base as baseConfigurationPlugin } from "@webiny/api-page-builder-so-ddb-es/elasticsearch/indices/base.js";

logger.debug(`Execute "setupFile" in "api-page-builder-so-ddb-es"`);

setStorageOps("pageBuilder", () => {
    logger.debug(`Instantiate storage ops in "api-page-builder-so-ddb-es"`);
    const documentClient = getDocumentClient();
    const { elasticsearchClient, plugins } = getElasticsearchClient({
        name: "api-page-builder-so-ddb-es",
        prefix: "api-page-builder-env-",
        onBeforeEach: async () => {
            logger.debug(`Start PB "onBeforeEach".`);
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
            logger.debug(`Finish PB "onBeforeEach".`);
        }
    });

    const initializedDbPlugins = dbPlugins({
        table: process.env.DB_TABLE,
        driver: new DynamoDbDriver({
            documentClient
        })
    });

    return {
        storageOperations: createStorageOperations({
            documentClient,
            elasticsearch: elasticsearchClient,
            table: table => ({ ...table, name: process.env.DB_TABLE }),
            esTable: table => ({ ...table, name: process.env.DB_TABLE_ELASTICSEARCH }),
            plugins: [...initializedDbPlugins]
        }),
        plugins: [...plugins, ...initializedDbPlugins]
    };
});
