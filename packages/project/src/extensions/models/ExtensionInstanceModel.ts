import { ExtensionDefinitionModel } from "./ExtensionDefinitionModel";
import { z } from "zod";

export class ExtensionInstanceModel<TParamsSchema extends z.ZodTypeAny> {
    definition: ExtensionDefinitionModel<TParamsSchema>;
    params: TParamsSchema;

    constructor(definition: ExtensionDefinitionModel<TParamsSchema>, params: TParamsSchema) {
        this.definition = definition;
        this.params = params;
    }

    async build() {
        return this.definition.build?.(this.params);
    }

    async validate() {
        return this.definition.validate?.(this.params);
    }

    async validateParams() {
        const paramsSchema = this.definition.paramsSchema;
        if (!paramsSchema) {
            return;
        }

        const validationResult = await paramsSchema.safeParseAsync(this.params);
        if (!validationResult.success) {
            throw new Error(
                `Validation failed for extension "${this.definition.type}": ${validationResult.error.message}`
            );
        }
    }
}
