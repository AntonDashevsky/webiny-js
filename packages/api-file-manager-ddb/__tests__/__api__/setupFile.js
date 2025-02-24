import dbPlugins from "@webiny/handler-db";
import { DynamoDbDriver } from "@webiny/db-dynamodb";
import dynamoDbPlugins from "@webiny/db-dynamodb/plugins/index.js";
import { createFileManagerStorageOperations } from "@webiny/api-file-manager-ddb";
import { getDocumentClient } from "@webiny/project-utils/testing/dynamodb/index.js";
import { setStorageOps } from "@webiny/project-utils/testing/environment/index.js";

setStorageOps("fileManager", () => {
    return {
        storageOperations: createFileManagerStorageOperations({
            documentClient: getDocumentClient()
        }),
        plugins: [
            ...dbPlugins({
                table: process.env.DB_TABLE,
                driver: new DynamoDbDriver({
                    documentClient: getDocumentClient()
                })
            }),
            ...dynamoDbPlugins()
        ]
    };
});
