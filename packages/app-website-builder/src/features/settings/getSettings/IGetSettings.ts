import type { IWebsiteBuilderSettings } from "~/features/settings/IWebsiteBuilderSettings.js";

export interface IEcommerceSettings {
    [key: string]: any;
}

export interface IGetSettings {
    execute(): Promise<IWebsiteBuilderSettings | undefined>;
}
