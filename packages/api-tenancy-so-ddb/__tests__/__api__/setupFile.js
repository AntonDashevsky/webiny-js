import { getDocumentClient } from "@webiny/project-utils/testing/dynamodb/index.js";
import { setStorageOps } from "@webiny/project-utils/testing/environment/index.js";
import { createStorageOperations } from "@webiny/api-tenancy-so-ddb";

setStorageOps("tenancy", () => {
    return {
        storageOperations: createStorageOperations({
            documentClient: getDocumentClient(),
            table: process.env.DB_TABLE
        }),
        plugins: []
    };
});
