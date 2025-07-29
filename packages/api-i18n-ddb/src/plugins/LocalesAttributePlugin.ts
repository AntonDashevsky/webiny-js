import type { AttributePluginParams } from "@webiny/db-dynamodb/plugins/definitions/AttributePlugin";
import { AttributePlugin } from "@webiny/db-dynamodb/plugins/definitions/AttributePlugin";

export class LocalesAttributePlugin extends AttributePlugin {
    public constructor(params: Omit<AttributePluginParams, "entity">) {
        super({
            ...params,
            entity: "I18NLocale"
        });
    }
}
