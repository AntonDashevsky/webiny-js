import type { IWebsiteBuilderSettings } from "~/features/settings/IWebsiteBuilderSettings";

export interface IEcommerceSettings {
    [key: string]: any;
}

export interface IUpdateSettings {
    execute(settings: IWebsiteBuilderSettings): Promise<void>;
}
