import type { IGetSettings } from "./IGetSettings.js";
import type { SettingsCache } from "~/shared/settingsCache.js";
import type { AllEcommerceSettings } from "~/features/ecommerce/settings/types.js";
import { SETTINGS_KEY } from "~/features/ecommerce/settings/constants.js";

export class GetSettingsRepository implements IGetSettings {
    private gateway: IGetSettings;
    private cache: SettingsCache;

    constructor(cache: SettingsCache, gateway: IGetSettings) {
        this.cache = cache;
        this.gateway = gateway;
    }

    async execute(): Promise<AllEcommerceSettings> {
        if (this.cache.has(SETTINGS_KEY)) {
            return this.cache.get(SETTINGS_KEY) as AllEcommerceSettings;
        }

        let settings = await this.gateway.execute();
        if (!settings) {
            settings = {};
        }

        this.cache.set(SETTINGS_KEY, settings);

        return settings as unknown as AllEcommerceSettings;
    }
}
