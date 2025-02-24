import { setStorageOps } from "@webiny/project-utils/testing/environment/index.js";
import { getDocumentClient } from "@webiny/project-utils/testing/dynamodb/index.js";
import { createPrerenderingServiceStorageOperations } from "../../dist";

setStorageOps("prerenderingService", () => {
    return {
        storageOperations: createPrerenderingServiceStorageOperations({
            table: table => ({ ...table, name: process.env.DB_TABLE }),
            documentClient: getDocumentClient()
        }),
        plugins: []
    };
});
