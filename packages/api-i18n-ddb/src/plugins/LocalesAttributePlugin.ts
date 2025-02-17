import {
    AttributePlugin,
    AttributePluginParams
} from "@webiny/db-dynamodb/plugins/definitions/AttributePlugin.js";

export class LocalesAttributePlugin extends AttributePlugin {
    public constructor(params: Omit<AttributePluginParams, "entity">) {
        super({
            ...params,
            entity: "I18NLocale"
        });
    }
}
