import type { FileManagerContextObject } from "~/types.js";
import { createFilesCrud } from "~/createFileManager/files.crud.js";
import { createSettingsCrud } from "~/createFileManager/settings.crud.js";
import { createSystemCrud } from "~/createFileManager/system.crud.js";
import type { FileManagerConfig } from "~/createFileManager/types.js";

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
