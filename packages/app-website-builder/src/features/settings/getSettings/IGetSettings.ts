import type { IWebsiteBuilderSettings } from "~/features/settings/IWebsiteBuilderSettings";

export interface IEcommerceSettings {
    [key: string]: any;
}

export interface IGetSettings {
    execute(): Promise<IWebsiteBuilderSettings | undefined>;
}
