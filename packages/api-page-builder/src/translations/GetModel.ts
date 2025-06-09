import { type PbContext } from "~/graphql/types.js";

export class GetModel {
    static async byModelId(context: PbContext, modelId: string) {
        const model = await context.cms.getModel(modelId);

        if (!model) {
            throw new Error(`Model "${modelId}" was not found!`);
        }

        return model;
    }
}
