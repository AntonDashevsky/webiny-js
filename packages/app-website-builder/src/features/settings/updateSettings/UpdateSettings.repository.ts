import type { IUpdateSettings } from "./IUpdateSettings";
import { SettingsCache } from "~/shared/settingsCache";

export interface IWebsiteBuilderSettings {
    previewDomain: string;
}

const SETTINGS_KEY = "WebsiteBuilder/Settings";

export class UpdateSettingsRepository implements IUpdateSettings {
    private gateway: IUpdateSettings;
    private cache: SettingsCache;

    constructor(cache: SettingsCache, gateway: IUpdateSettings) {
        this.cache = cache;
        this.gateway = gateway;
    }

    async execute(settings: IWebsiteBuilderSettings): Promise<void> {
        try {
            this.cache.set(SETTINGS_KEY, settings);
            await this.gateway.execute(settings);
        } catch (error) {
            console.log(`[Error] UpdateSettingsRepository: ${error.message}`);
        }
    }
}
