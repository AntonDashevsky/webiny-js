import dbPlugins from "@webiny/handler-db";
import dynamoDbPlugins from "@webiny/db-dynamodb/plugins/index.js";
import { DynamoDbDriver } from "@webiny/db-dynamodb";
import { getDocumentClient } from "@webiny/project-utils/testing/dynamodb/index.js";
import { setStorageOps } from "@webiny/project-utils/testing/environment/index.js";
import { createI18NStorageOperations } from "@webiny/api-i18n-ddb";

/**
 * i18n is the only remaining package that does not inject storage operations instance into the context
 * directly, and instead, uses a bunch of plugins, which are then picked up by the context.
 */
setStorageOps("i18n", () => {
    return {
        storageOperations: [
            ...createI18NStorageOperations(),
            ...dbPlugins({
                table: process.env.DB_TABLE,
                driver: new DynamoDbDriver({
                    documentClient: getDocumentClient()
                })
            }),
            ...dynamoDbPlugins()
        ],
        plugins: []
    };
});
