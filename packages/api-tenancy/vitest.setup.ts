import { createTestConfig } from "../../testing";

export default async () => {
    const { getPresets } = await import("@webiny/project-utils/testing/presets/index.js");
    const presets = await getPresets(["@webiny/api-tenancy", "storage-operations"]);

    return createTestConfig({
        path: import.meta.dirname,
        presets
    });
};
