import base from "../../jest.config.base";
import { getPresets } from "@webiny/project-utils/testing/presets/index.js";

export default async () => {
    const config = await base(
        { path: import.meta.dirname },
        await getPresets(
            ["@webiny/api-security", "storage-operations"],
            ["@webiny/api-tenancy", "storage-operations"]
        )
    );

    return config;
};
