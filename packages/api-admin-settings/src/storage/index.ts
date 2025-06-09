import WebinyError from "@webiny/error";
import { createSettingsEntity } from "./definitions/settings.js";
import { createTable } from "./definitions/table.js";
import { type StorageOperationsFactory } from "./types.js";
import { createSettingsStorageOperations } from "~/storage/operations/settings.js";

export const createStorageOperations: StorageOperationsFactory = async params => {
    const { table, documentClient } = params;

    if (!documentClient) {
        throw new WebinyError(
            "Missing documentClient in @webiny/api-admin-settings storage operations.",
            "DOCUMENT_CLIENT_ERROR"
        );
    }

    const tableInstance = createTable({
        table,
        documentClient
    });

    const entities = {
        settings: createSettingsEntity({
            entityName: "AdminSettings",
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
