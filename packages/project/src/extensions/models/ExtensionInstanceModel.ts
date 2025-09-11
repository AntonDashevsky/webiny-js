import { type ExtensionDefinitionModel } from "./ExtensionDefinitionModel.js";
import { type z } from "zod";
import { type ProjectModel } from "~/models/index.js";

export interface ExtensionInstanceModelContext {
    [key: string]: any;

    project: ProjectModel;
}

export class ExtensionInstanceModel<TParamsSchema extends z.ZodTypeAny> {
    constructor(
        public definition: ExtensionDefinitionModel<TParamsSchema>,
        public params: z.infer<TParamsSchema>,
        public context: ExtensionInstanceModelContext
    ) {}

    async build() {
        return this.definition.build?.(this.params, this.context);
    }

    async validate() {
        return this.definition.validate?.(this.params);
    }

    async validateParams() {
        if (!this.definition.paramsSchema) {
            return;
        }

        const paramsSchema =
            typeof this.definition.paramsSchema === "function"
                ? this.definition.paramsSchema(this.context)
                : this.definition.paramsSchema;

        const validationResult = await paramsSchema.safeParseAsync(this.params);
        if (!validationResult.success) {
            throw new Error(
                `Validation failed for extension "${this.definition.type}": ${validationResult.error.message}`
            );
        }
    }
}
