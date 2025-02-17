import "./handler/register.js";
import { Plugin } from "@webiny/plugins/types.js";
import { createWebsocketsContext } from "~/context/index.js";
import { createWebsocketsGraphQL } from "~/graphql/index.js";

export const createWebsockets = (): Plugin[] => {
    return [createWebsocketsContext(), createWebsocketsGraphQL()];
};

export * from "./validator/index.js";
export * from "./transport/index.js";
export * from "./runner/index.js";
export * from "./registry/index.js";
export * from "./context/index.js";

export * from "./plugins/index.js";
export * from "./types.js";
