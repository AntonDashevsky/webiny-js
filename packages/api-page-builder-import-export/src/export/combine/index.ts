import { PbImportExportContext } from "~/types.js";
import { SecurityIdentity } from "@webiny/api-security/types.js";
import { createRawEventHandler } from "@webiny/handler-aws";
import { blocksHandler } from "~/export/combine/blocksHandler.js";
import { formsHandler } from "~/export/combine/formsHandler.js";
import { templatesHandler } from "~/export/combine/templatesHandler.js";

export interface Payload {
    taskId: string;
    type: string;
    identity: SecurityIdentity;
}

export interface Response {
    data: string | null;
    error: Partial<Error> | null;
}

/**
 * Handles the export pages combine workflow.
 */
export default () => {
    return createRawEventHandler<Payload, PbImportExportContext, Response>(
        async ({ payload, context }) => {
            return context.security.withoutAuthorization(() => {
                switch (payload.type) {
                    case "block": {
                        return blocksHandler(payload, context);
                    }
                    case "form": {
                        return formsHandler(payload, context);
                    }
                    case "template": {
                        return templatesHandler(payload, context);
                    }
                    default: {
                        console.log("Export PB combine", JSON.stringify(payload));
                        throw new Error("Invalid type provided: pb combine.");
                    }
                }
            });
        }
    );
};
