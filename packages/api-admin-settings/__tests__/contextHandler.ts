import { createHandler, createEventHandler } from "@webiny/handler-aws/raw";
import { until, sleep } from "./context/helpers";
import type { CreateHandlerParams } from "./handlerPlugins";
import { createHandlerPlugins } from "./handlerPlugins";
import type { LambdaContext } from "@webiny/handler-aws/types";

export const createContextHandler = (params?: CreateHandlerParams) => {
    const handle = createHandler({
        plugins: [
            createEventHandler(async ({ context }) => {
                return context;
            }),
            ...createHandlerPlugins(params)
        ],
        debug: false
    });

    return {
        until,
        sleep,
        handle: async () => {
            return handle(
                {
                    headers: {
                        ["x-tenant"]: "root",
                        ["Content-Type"]: "application/json"
                    }
                },
                {} as LambdaContext
            );
        }
    };
};
