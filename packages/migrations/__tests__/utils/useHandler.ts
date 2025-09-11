import { createHandler } from "@webiny/handler-aws/raw";
import type { MigrationEventHandlerResponse } from "@webiny/data-migration";

export const useHandler = (...plugins: any[]) => {
    return createHandler<any, MigrationEventHandlerResponse>({
        plugins: [...plugins]
    });
};
