import dbPlugins from "@webiny/handler-db";
import { DynamoDbDriver } from "@webiny/db-dynamodb";
/**
 * For this to work it must load plugins that have already been built
 */
import { createStorageOperations } from "../../dist";
import { setStorageOps } from "@webiny/project-utils/testing/environment/index.js";
import { getDocumentClient } from "@webiny/project-utils/testing/dynamodb/index.js";

setStorageOps("pageBuilder", () => {
    return {
        storageOperations: createStorageOperations({
            documentClient: getDocumentClient(),
            table: table => ({ ...table, name: process.env.DB_TABLE })
        }),
        plugins: [
            dbPlugins({
                table: process.env.DB_TABLE,
                driver: new DynamoDbDriver({
                    documentClient: getDocumentClient()
                })
            })
        ]
    };
});
