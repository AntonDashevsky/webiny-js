import { Abstraction } from "@webiny/di-container";

export type ExtensionTags = {
    [key: string]: string | undefined;
    appName?: "core" | "api" | "admin" | "website";
    runtimeContext?: "app-build" | "project" | "cli" | "pulumi";
};

export interface CreateExtensionParams<TParams extends Record<string, any> = Record<string, any>> {
    type: string;
    tags: ExtensionTags;
    description?: string;
    multiple?: boolean;
    abstraction?: Abstraction<any>;
    build?: (params: TParams) => Promise<void> | void;
    validate?: (params: TParams) => Promise<void> | void;
}
