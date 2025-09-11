import { createContextPlugin } from "@webiny/api";
import type { WebsiteBuilderContext } from "./context/types.js";
import { WebsiteBuilder } from "./context/WebsiteBuilder.js";
import { createGraphQL } from "./graphql/createGraphQL.js";
import { createRedirectsRoute } from "./rest/getRedirects.js";

const createContext = () => {
    return createContextPlugin<WebsiteBuilderContext>(
        async context => {
            context.websiteBuilder = await WebsiteBuilder.create(context);
        },
        { name: "wb.createContext" }
    );
};

export const createWebsiteBuilder = () => {
    return [createContext(), createGraphQL(), createRedirectsRoute()];
};

export type { WebsiteBuilderContext };
