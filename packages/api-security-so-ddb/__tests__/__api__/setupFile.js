import { getDocumentClient } from "@webiny/project-utils/testing/dynamodb/index.js";
import { setStorageOps } from "@webiny/project-utils/testing/environment/index.js";
import { createStorageOperations } from "@webiny/api-security-so-ddb";

setStorageOps("security", () => {
    return {
        storageOperations: createStorageOperations({
            documentClient: getDocumentClient(),
            table: process.env.DB_TABLE
        }),
        plugins: []
    };
});
