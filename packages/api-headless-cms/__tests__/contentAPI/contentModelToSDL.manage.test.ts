import prettier from "prettier";
import contentModels from "./mocks/contentModels.js";
import { createGraphQLFields } from "~/graphqlFields/index.js";
import categoryManage from "./snapshots/category.manage.js";
import productManage from "./snapshots/product.manage.js";
import reviewManage from "./snapshots/review.manage.js";
import type { CmsModel, CmsModelFieldToGraphQLPlugin } from "~/types/index.js";
import { createManageSDL } from "~/graphql/schema/createManageSDL.js";
import { pageModel } from "./mocks/pageWithDynamicZonesModel.js";
import pageManage from "./snapshots/page.manage.js";

describe("MANAGE - ContentModel to SDL", () => {
    const fieldTypePlugins = createGraphQLFields().reduce<
        Record<string, CmsModelFieldToGraphQLPlugin>
    >((acc, pl) => {
        acc[pl.fieldType] = pl;
        return acc;
    }, {});

    const models = [...contentModels];

    test("Category SDL", async () => {
        const model = contentModels.find(c => c.modelId === "category") as CmsModel;
        const sdl = createManageSDL({ models, model, fieldTypePlugins, sorterPlugins: [] });
        const prettyGql = await prettier.format(sdl.trim(), { parser: "graphql" });
        const prettySnapshot = await prettier.format(categoryManage.trim(), { parser: "graphql" });
        expect(prettyGql).toBe(prettySnapshot);
    });

    test("Product SDL", async () => {
        const model = contentModels.find(c => c.modelId === "product") as CmsModel;
        const sdl = createManageSDL({ models, model, fieldTypePlugins, sorterPlugins: [] });
        const prettyGql = await prettier.format(sdl.trim(), { parser: "graphql" });
        const prettySnapshot = await prettier.format(productManage.trim(), { parser: "graphql" });
        expect(prettyGql).toBe(prettySnapshot);
    });

    test("Review SDL", async () => {
        const model = contentModels.find(c => c.modelId === "review") as CmsModel;
        const sdl = createManageSDL({ models, model, fieldTypePlugins, sorterPlugins: [] });
        const prettyGql = await prettier.format(sdl.trim(), { parser: "graphql" });
        const prettySnapshot = await prettier.format(reviewManage.trim(), { parser: "graphql" });
        expect(prettyGql).toBe(prettySnapshot);
    });

    test("Dynamic Zone SDL", async () => {
        const sdl = createManageSDL({
            models,
            model: pageModel as CmsModel,
            fieldTypePlugins,
            sorterPlugins: []
        });
        const prettyGql = await prettier.format(sdl.trim(), { parser: "graphql" });
        const prettySnapshot = await prettier.format(pageManage.trim(), { parser: "graphql" });
        expect(prettyGql).toBe(prettySnapshot);
    });
});
