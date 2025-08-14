import { defineExtension } from "~/extensions/defineExtension/index.js";

export interface ProductionEnvironments {
    tags: Record<string, string>;
}

export const productionEnvironments = defineExtension<ProductionEnvironments>({
    type: "Deployments/ProductionEnvironments",
    tags: { runtimeContext: "project" },
    description: "Provide names for environments that are considered production environments.",
    multiple: true
});
