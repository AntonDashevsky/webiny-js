import base from "../../jest.config.base";
import { getPresets } from "@webiny/project-utils/testing/presets/index.js";

export default async () => {
    const config = await  base(
        { path: import.meta.dirname },
        await getPresets(
            ["@webiny/api-admin-users", "storage-operations"],
            ["@webiny/api-headless-cms", "storage-operations"],
            ["@webiny/api-file-manager", "storage-operations"],
            ["@webiny/api-i18n", "storage-operations"],
            ["@webiny/api-security", "storage-operations"],
            ["@webiny/api-tenancy", "storage-operations"]
        )
    );

    return config;
};
