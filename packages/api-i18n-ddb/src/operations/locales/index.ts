import { LocalesStorageOperations } from "./LocalesStorageOperations.js";
import type { LocalesStorageOperationsProviderPluginParams } from "@webiny/api-i18n/plugins/LocalesStorageOperationsProviderPlugin.js";
import { LocalesStorageOperationsProviderPlugin } from "@webiny/api-i18n/plugins/LocalesStorageOperationsProviderPlugin.js";
import fields from "./fields.js";

export class LocalesStorageOperationsProviderDdbPlugin extends LocalesStorageOperationsProviderPlugin {
    public override name = "i18n.storageOperationsProvider.settings.ddb";
    public async provide({ context }: LocalesStorageOperationsProviderPluginParams) {
        context.plugins.register(fields());

        return new LocalesStorageOperations({
            context
        });
    }
}
