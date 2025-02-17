import { FileManagerContextObject, FileManagerStorageOperations } from "~/types.js";
import { GetPermissions, SecurityIdentity } from "@webiny/api-security/types.js";
import { createFilesCrud } from "~/createFileManager/files.crud.js";
import { FileStorage } from "~/storage/FileStorage.js";
import { createSettingsCrud } from "~/createFileManager/settings.crud.js";
import { createSystemCrud } from "~/createFileManager/system.crud.js";
import { FilesPermissions } from "~/createFileManager/permissions/FilesPermissions.js";

export interface FileManagerConfig {
    storageOperations: FileManagerStorageOperations;
    filesPermissions: FilesPermissions;
    getTenantId: () => string;
    getLocaleCode: () => string;
    getIdentity: () => SecurityIdentity;
    getPermissions: GetPermissions;
    storage: FileStorage;
    WEBINY_VERSION: string;
}

export const createFileManager = (config: FileManagerConfig): FileManagerContextObject => {
    const filesCrud = createFilesCrud(config);
    const settingsCrud = createSettingsCrud(config);
    const systemCrud = createSystemCrud(config);

    return {
        ...filesCrud,
        ...settingsCrud,
        ...systemCrud,
        storage: config.storage
    };
};
