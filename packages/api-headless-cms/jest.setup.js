import base from "../../jest.config.base.js";

export default async () => {
    const { getPresets } = await import("@webiny/project-utils/testing/presets/index.js");
    const presets = await getPresets(
        ["@webiny/api-headless-cms", "storage-operations"],
        ["@webiny/api-i18n", "storage-operations"],
        ["@webiny/api-security", "storage-operations"],
        ["@webiny/api-tenancy", "storage-operations"]
    );

    return base({ path: import.meta.dirname }, presets);
};
