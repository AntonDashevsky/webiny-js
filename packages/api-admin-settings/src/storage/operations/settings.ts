import { Entity } from "@webiny/db-dynamodb/toolbox.js";
import { get } from "@webiny/db-dynamodb/utils/get.js";
import WebinyError from "@webiny/error";
import { AdminSettings } from "~/types.js";
import { StorageOperationsSettingsService } from "~/storage/types.js";

interface DbData {
    PK: string;
    SK: string;
    data: AdminSettings;
}

interface Params {
    entity: Entity<any>;
}
export const createSettingsStorageOperations = async (
    params: Params
): Promise<StorageOperationsSettingsService> => {
    const { entity } = params;

    return {
        getSettings: async variant => {
            let result: DbData | null = null;
            try {
                result = await get<DbData>({
                    entity,
                    keys: {
                        PK: "ADMIN#SETTINGS",
                        SK: variant
                    }
                });
            } catch (ex) {
                throw new WebinyError(
                    `Could not load AdminSettings for variant "${variant}".`,
                    "ADMIN_SETTINGS_LOAD_ERROR",
                    {
                        error: {
                            message: ex.message,
                            code: ex.code,
                            data: ex.data
                        }
                    }
                );
            }
            if (!result) {
                return null;
            }
            if (Object.keys(result?.data || {}).length === 0) {
                return null;
            }
            return {
                ...result.data
            };
        }
    };
};
