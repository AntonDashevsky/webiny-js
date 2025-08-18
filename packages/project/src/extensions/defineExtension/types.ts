import { z } from "zod";

export type ExtensionTags = {
    [key: string]: string | undefined;
    appName?: "core" | "api" | "admin" | "website";
    runtimeContext?: "app-build" | "project" | "cli" | "pulumi";
};

export interface DefineExtensionParams<TParamsSchema extends z.ZodTypeAny> {
    type: string;
    tags: ExtensionTags;
    description?: string;
    multiple?: boolean;
    paramsSchema?: TParamsSchema;
    build?: (params: z.infer<TParamsSchema>) => Promise<void> | void;
    validate?: (params: z.infer<TParamsSchema>) => Promise<void> | void;
}
