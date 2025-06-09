import { type CmsModelManager, type ModelManagerPlugin } from "~/types/index.js";
import { DefaultCmsModelManager } from "./DefaultCmsModelManager.js";
export * from "./SingletonModelManager.js";

const plugin: ModelManagerPlugin = {
    type: "cms-content-model-manager",
    name: "content-model-manager-default",
    async create(context, model) {
        return new DefaultCmsModelManager(context, model) as CmsModelManager<any>;
    }
};

export const createDefaultModelManager = () => plugin;
