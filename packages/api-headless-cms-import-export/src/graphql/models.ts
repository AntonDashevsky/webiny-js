import type { Context } from "~/types.js";
import type { CmsModel } from "@webiny/api-headless-cms/types/index.js";

export const listModels = async (context: Context): Promise<CmsModel[]> => {
    return await context.security.withoutAuthorization(async () => {
        try {
            const models = await context.cms.listModels();

            return models.filter(model => {
                return !model.isPrivate;
            });
        } catch {
            return [];
        }
    });
};
