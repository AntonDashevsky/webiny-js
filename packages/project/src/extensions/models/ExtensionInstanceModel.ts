import { ExtensionDefinitionModel } from "./ExtensionDefinitionModel.js";
import { z } from "zod";
import { ProjectModel } from "~/models/index.js";

export interface ExtensionInstanceModelContext {
    [key: string]: any;
    project: ProjectModel;
}

export class ExtensionInstanceModel<TParamsSchema extends z.ZodTypeAny> {
    constructor(
        public definition: ExtensionDefinitionModel<TParamsSchema>,
        public params: TParamsSchema,
        public context: ExtensionInstanceModelContext
    ) {}

    async build() {
        return this.definition.build?.(this.params, this.context);
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
