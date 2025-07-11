import { ExtensionDefinitionModel } from "./ExtensionDefinitionModel";

export class ExtensionInstanceModel<TParams extends Record<string, any> = Record<string, any>> {
    definition: ExtensionDefinitionModel;
    params: TParams;

    constructor(definition: ExtensionDefinitionModel, params: TParams) {
        this.definition = definition;
        this.params = params;
    }

    async build() {
        return this.definition.build?.(this.params);
    }

    async validate() {
        return this.definition.validate?.(this.params);
    }
}
