import { createInstallGraphQL } from "./install";
import type { ICreateMutationCb, ICreateQueryCb } from "~tests/handlers/helpers/factory/types";
import { createLoggerGraphQL } from "./logger";

export interface ICreateGraphQlParams {
    createQuery: ICreateQueryCb;
    createMutation: ICreateMutationCb;
}

export const createGraphQl = (params: ICreateGraphQlParams) => {
    return {
        ...createInstallGraphQL(params),
        ...createLoggerGraphQL(params)
    };
};
