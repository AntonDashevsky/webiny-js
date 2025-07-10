import WebinyError from "@webiny/error";
import { createStandardEntity, createTable } from "@webiny/db-dynamodb";
import { StorageOperationsFactory } from "./types";
import { createSettingsStorageOperations } from "~/storage/operations/settings";

export const createStorageOperations: StorageOperationsFactory = async params => {
    const { documentClient } = params;

    if (!documentClient) {
        throw new WebinyError(
            "Missing documentClient in @webiny/api-admin-settings storage operations.",
            "DOCUMENT_CLIENT_ERROR"
        );
    }

    const tableInstance = createTable({
        name: process.env.DB_TABLE_ADMIN_SETTINGS || (process.env.DB_TABLE as string),
        documentClient
    });

    const entities = {
        settings: createStandardEntity({
            name: "AdminSettings",
            table: tableInstance
        })
    };

    return {
        getEntities: () => entities,
        getTable: () => tableInstance,
        settings: await createSettingsStorageOperations({
            entity: entities.settings
        })
    };
};
