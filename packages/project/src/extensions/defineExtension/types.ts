import { z } from "zod";
import { ExtensionInstanceModelContext } from "~/extensions";
import { AppName } from "~/abstractions/types";

export type ExtensionTags = {
    [key: string]: string | undefined;
    appName?: AppName;
    runtimeContext?: "app-build" | "project" | "cli" | "pulumi";
};

export interface DefineExtensionParams<TParamsSchema extends z.ZodTypeAny> {
    type: string;
    tags: ExtensionTags;
    description?: string;
    multiple?: boolean;
    paramsSchema?: TParamsSchema;
    build?: (
        params: z.infer<TParamsSchema>,
        ctx: ExtensionInstanceModelContext
    ) => Promise<void> | void;
    validate?: (params: z.infer<TParamsSchema>) => Promise<void> | void;
}
