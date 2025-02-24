import { setStorageOps } from "@webiny/project-utils/testing/environment/index.js";
import { getDocumentClient } from "@webiny/project-utils/testing/dynamodb/index.js";
import { createStorageOperations } from "../../dist/index";

setStorageOps("pageBuilderImportExport", () => {
    return {
        storageOperations: createStorageOperations({
            documentClient: getDocumentClient(),
            table: process.env.DB_TABLE
        }),
        plugins: []
    };
});
