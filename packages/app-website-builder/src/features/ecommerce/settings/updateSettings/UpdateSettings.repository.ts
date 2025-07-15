import type { IUpdateSettings } from "./IUpdateSettings";
import type { SettingsCache } from "~/shared/settingsCache";
import type { AllEcommerceSettings } from "~/features/ecommerce/settings/types";
import { SETTINGS_KEY } from "~/features/ecommerce/settings/constants";

export interface IWebsiteBuilderSettings {
    previewDomain: string;
}

export class UpdateSettingsRepository implements IUpdateSettings {
    private gateway: IUpdateSettings;
    private cache: SettingsCache;

    constructor(cache: SettingsCache, gateway: IUpdateSettings) {
        this.cache = cache;
        this.gateway = gateway;
    }

    async execute(settings: AllEcommerceSettings): Promise<void> {
        try {
            this.cache.set(SETTINGS_KEY, settings);
            await this.gateway.execute(settings);
        } catch (error) {
            console.log(`[Error] UpdateSettingsRepository: ${error.message}`);
        }
    }
}
