import { Route } from "@webiny/app/router.js";

export const Routes = {
    ContentModelGroups: {
        List: new Route({
            name: "Cms/ContentModelGroups/List",
            path: "/cms/content-model-groups",
            params: zod => {
                return {
                    id: zod.string().optional(),
                    new: zod.boolean().optional()
                };
            }
        })
    },

    ContentEntries: {
        List: new Route({
            name: "Cms/ContentEntries/List",
            path: "/cms/content-entries/:modelId",
            params: zod => {
                return {
                    modelId: zod.string(),
                    id: zod.string().optional(),
                    folderId: zod.string().optional(),
                    search: zod.string().optional(),
                    new: zod.boolean().optional()
                };
            }
        })
    },

    ContentModels: {
        Editor: new Route({
            name: "Cms/ContentModels/Editor",
            path: "/cms/content-models/:modelId",
            params: zod => {
                return {
                    modelId: zod.string()
                };
            }
        }),
        List: new Route({
            name: "Cms/ContentModels/List",
            path: "/cms/content-models"
        })
    }
};
