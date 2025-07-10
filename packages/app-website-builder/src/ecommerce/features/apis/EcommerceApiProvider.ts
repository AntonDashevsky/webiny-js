import type { IEcommerceApi } from "~/ecommerce";
import { IEcommerceSettings } from "~/ecommerce/features/settings/IEcommerceSettings";
import { EcommerceApiManifest } from "~/ecommerce/features/apis/EcommerceApiManifest";

interface IEcommerceApiProvider {
    setApiManifest(manifest: EcommerceApiManifest): void;
    getApiManifest(name: string): EcommerceApiManifest | undefined;
    getApiManifests(): EcommerceApiManifest[];
    getApi(name: string): Promise<IEcommerceApi | undefined>;
}

export interface IEcommerceSettingsLoader {
    (name: string): Promise<IEcommerceSettings | undefined>;
}

export class EcommerceApiProvider implements IEcommerceApiProvider {
    private apiManifests: Map<string, EcommerceApiManifest>;
    private apiCache: Map<string, IEcommerceApi>;
    private readonly settingsLoader: IEcommerceSettingsLoader;

    constructor(settingsLoader: IEcommerceSettingsLoader) {
        this.settingsLoader = settingsLoader;
        this.apiManifests = new Map<string, EcommerceApiManifest>();
        this.apiCache = new Map<string, IEcommerceApi>();
    }

    async getApi(name: string): Promise<IEcommerceApi | undefined> {
        if (this.apiCache.has(name)) {
            return this.apiCache.get(name) as IEcommerceApi;
        }

        const apiManifest = this.apiManifests.get(name);
        if (!apiManifest) {
            return undefined;
        }

        const settings = await this.settingsLoader(name);
        if (!settings) {
            throw new Error(`${name} is not configured!`);
        }

        const api = await apiManifest.getApi(settings);

        this.apiCache.set(name, api);

        return api;
    }

    getApiManifests() {
        return Array.from(this.apiManifests.values());
    }

    public getApiManifest(name: string): EcommerceApiManifest | undefined {
        const apiManifest = this.apiManifests.get(name);
        if (!apiManifest) {
            return undefined;
        }

        return apiManifest;
    }

    public setApiManifest(manifest: EcommerceApiManifest): void {
        this.apiManifests.set(manifest.getName(), manifest);
    }
}
