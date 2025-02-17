import {
    AttributePlugin,
    AttributePluginParams
} from "@webiny/db-dynamodb/plugins/definitions/AttributePlugin.js";

export class SystemAttributePlugin extends AttributePlugin {
    public constructor(params: Omit<AttributePluginParams, "entity">) {
        super({
            ...params,
            entity: "I18NSystem"
        });
    }
}
