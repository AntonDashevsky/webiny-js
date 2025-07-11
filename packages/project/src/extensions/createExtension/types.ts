import { Abstraction } from "@webiny/di-container";

export interface CreateExtensionParams<TParams extends Record<string, any> = Record<string, any>> {
    type: string;
    description?: string;
    array?: boolean;
    abstraction?: Abstraction<any>;
    build?: (params: TParams) => Promise<void> | void;
    validate?: (params: TParams) => Promise<void> | void;
}
