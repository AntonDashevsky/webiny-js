import type { IGetSettings } from "./IGetSettings.js";
import type { SettingsCache } from "~/shared/settingsCache.js";

export interface WebsiteBuilderSettings {
    previewDomain: string;
}

const SETTINGS_KEY = "WebsiteBuilder/Settings";

export class GetSettingsRepository implements IGetSettings {
    private gateway: IGetSettings;
    private cache: SettingsCache;

    constructor(cache: SettingsCache, gateway: IGetSettings) {
        this.cache = cache;
        this.gateway = gateway;
    }

    async execute(): Promise<WebsiteBuilderSettings> {
        if (this.cache.has(SETTINGS_KEY)) {
            return this.cache.get(SETTINGS_KEY) as WebsiteBuilderSettings;
        }

        let settings = await this.gateway.execute();

        if (!settings) {
            settings = { previewDomain: "http://localhost:3000" };
        }

        this.cache.set(SETTINGS_KEY, settings);

        return settings;
    }
}
