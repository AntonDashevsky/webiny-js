import { type PbImportExportContext } from "~/types.js";
import { type SecurityIdentity } from "@webiny/api-security/types.js";
import { createRawEventHandler } from "@webiny/handler-aws";
import { blocksHandler } from "~/import/process/blocks/blocksHandler.js";
import { formsHandler } from "~/import/process/forms/formsHandler.js";
import { templatesHandler } from "~/import/process/templates/templatesHandler.js";

export interface Configuration {
    handlers: {
        process: string;
    };
}

export interface Payload {
    taskId: string;
    subTaskIndex: number;
    type: string;
    identity: SecurityIdentity;
    meta?: Record<string, any>;
}

export interface Response {
    data: string | null;
    error: Partial<Error> | null;
}

export default (configuration: Configuration) => {
    return createRawEventHandler<Payload, PbImportExportContext, Response>(
        async ({ payload, context }) => {
            return context.security.withoutAuthorization(() => {
                switch (payload.type) {
                    case "block": {
                        return blocksHandler(configuration, payload, context);
                    }
                    case "form": {
                        return formsHandler(configuration, payload, context);
                    }
                    case "template": {
                        return templatesHandler(configuration, payload, context);
                    }
                    default: {
                        console.log("Import PB process", JSON.stringify(payload));
                        throw new Error("Invalid type provided: pb import process.");
                    }
                }
            });
        }
    );
};
