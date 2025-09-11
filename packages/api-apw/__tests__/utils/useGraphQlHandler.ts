import type { GQLHandlerCallableParams } from "~tests/utils/createGraphQlHandler";
import { createGraphQlHandler } from "~tests/utils/createGraphQlHandler";

export const useGraphQlHandler = (params: GQLHandlerCallableParams) => {
    return createGraphQlHandler(params);
};
