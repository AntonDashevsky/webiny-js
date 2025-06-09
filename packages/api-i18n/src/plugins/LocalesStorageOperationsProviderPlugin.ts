import { Plugin } from "@webiny/plugins";
import { type I18NContext, type I18NLocalesStorageOperations } from "~/types.js";

export interface LocalesStorageOperationsProviderPluginParams {
    context: I18NContext;
}

export abstract class LocalesStorageOperationsProviderPlugin extends Plugin {
    public static override readonly type: string = "i18n.storageOperationsProvider.locales";

    public abstract provide(
        params: LocalesStorageOperationsProviderPluginParams
    ): Promise<I18NLocalesStorageOperations>;
}
