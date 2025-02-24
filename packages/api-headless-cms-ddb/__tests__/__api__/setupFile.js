import dbPlugins from "@webiny/handler-db";
import { DynamoDbDriver } from "@webiny/db-dynamodb";
import { createStorageOperations, createCmsEntryFieldSortingPlugin } from "../../dist";
import { setStorageOps } from "@webiny/project-utils/testing/environment/index.js";
import { getDocumentClient } from "@webiny/project-utils/testing/dynamodb/index.js";

setStorageOps("cms", () => {
    const documentClient = getDocumentClient();

    const plugins = [
        /**
         * TODO remove when all apps are created with their own storage operations factory and drivers.
         */
        dbPlugins({
            table: process.env.DB_TABLE,
            driver: new DynamoDbDriver({
                documentClient
            })
        }),
        createCmsEntryFieldSortingPlugin({
            canUse: params => {
                const { fieldId } = params;
                return fieldId === "customSorter";
            },
            createSort: params => {
                const { order, fields } = params;

                const field = Object.values(fields).find(f => f.fieldId === "createdBy");
                if (!field) {
                    throw new Error("Impossible, but it seems there is no field createdBy.");
                }
                return {
                    reverse: order === "DESC",
                    valuePath: "createdBy.id",
                    field,
                    fieldId: field.fieldId
                };
            }
        })
    ];

    return {
        storageOperations: createStorageOperations({
            documentClient,
            table: table => ({ ...table, name: process.env.DB_TABLE })
        }),
        plugins
    };
});
