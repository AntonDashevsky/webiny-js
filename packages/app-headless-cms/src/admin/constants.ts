import { z } from "zod";
export { ROOT_FOLDER } from "@webiny/app-aco/constants.js";
export const CMS_ENTRY_LIST_LINK = "/cms/content-entries";
export const LOCAL_STORAGE_LATEST_VISITED_FOLDER = "webiny_cms_entry_latest_visited_folder";

export type Statuses = typeof statuses;

export const statuses = {
    draft: "Draft",
    published: "Published",
    unpublished: "Unpublished"
};


interface RouteParams<TParams extends z.ZodTypeAny> {
    name: string;
    path: `/${string}`;
    params?: TParams;
}

class RouteDefinition<TParams extends z.ZodTypeAny = z.ZodUndefined> {
    constructor(private route: RouteParams<TParams>) {}

    get name() {
        return this.route.name;
    }

    get params() {
        return { } as z.infer<TParams>;
    }
}


export const Routes = {
    ContentModelGroups: new RouteDefinition({
        name: "Cms/ContentModelGroups",
        path: "/cms/content-model-groups"
    }),
    ContentEntries: new RouteDefinition({
        name: "Cms/ContentEntries",
        path: "/cms/content-entries/:modelId",
        params: z
            .object({
                modelId: z.string().describe("Model"),
            })
            .passthrough()
    })
};

function useRoute<TRoute extends RouteDefinition<any>>(route: TRoute) {
    return {} as TRoute;
}
