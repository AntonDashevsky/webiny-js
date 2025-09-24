import { createContextHandler } from "./contextHandler.js";
import { GetSettings } from "~/features/getSettings/GetSettings.feature.js";
import { SaveSettings } from "~/features/saveSettings/SaveSettings.feature.js";
import type { Context } from "./types.js";
import { describe, it, expect } from "vitest";

describe("Settings", () => {
    const { handle } = createContextHandler();

    const settingsName = "websiteBuilderIntegrations";

    it("should get empty settings", async () => {
        const context = (await handle()) as any as Context;

        const getSettings = GetSettings.create(context);

        const settings = await getSettings.execute(settingsName);

        expect(settings.getName()).toBe(settingsName);
        expect(settings.getData()).toEqual({});
    });

    it("should save settings", async () => {
        const context = (await handle()) as any as Context;

        const saveSettings = SaveSettings.create(context);

        const settings1 = await saveSettings.execute({
            name: settingsName,
            settings: {
                platform: { endpoint: "https://platform.com/api" }
            }
        });

        expect(settings1.getName()).toBe(settingsName);
        expect(settings1.getData()).toEqual({
            platform: { endpoint: "https://platform.com/api" }
        });

        // Assert using GetSettings feature.
        const getSettings = GetSettings.create(context);

        const settings2 = await getSettings.execute(settingsName);

        expect(settings2.getName()).toBe(settingsName);
        expect(settings2.getData()).toEqual({
            platform: { endpoint: "https://platform.com/api" }
        });
    });
});
