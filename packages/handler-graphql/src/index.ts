import { Plugin } from "@webiny/plugins/types.js";
import { HandlerGraphQLOptions } from "./types.js";
import createGraphQLHandler from "./createGraphQLHandler.js";

export * from "./errors.js";
export * from "./responses.js";
export * from "./utils/index.js";
export * from "./plugins/index.js";
export * from "./processRequestBody.js";
export * from "./createResolverDecorator.js";
export * from "./ResolverDecoration.js";

export default (options: HandlerGraphQLOptions = {}): Plugin[] => {
    return createGraphQLHandler(options);
};
