import dbPlugins from "@webiny/handler-db";
import { DynamoDbDriver } from "@webiny/db-dynamodb";
import { getDocumentClient } from "@webiny/project-utils/testing/dynamodb/index.js";
import { createStorageOperations } from "../../dist";
import { setStorageOps } from "@webiny/project-utils/testing/environment/index.js";

setStorageOps("apwSchedule", () => {
    return {
        storageOperations: createStorageOperations({
            documentClient: getDocumentClient(),
            table: process.env.DB_TABLE
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
