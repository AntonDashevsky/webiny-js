import {
    AttributePlugin,
    type AttributePluginParams
} from "@webiny/db-dynamodb/plugins/definitions/AttributePlugin.js";

export class SettingsAttributePlugin extends AttributePlugin {
    public constructor(params: Omit<AttributePluginParams, "entity">) {
        super({
            ...params,
            entity: "FM.Settings"
        });
    }
}
