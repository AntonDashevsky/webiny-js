import { Abstraction } from "@webiny/di-container";

export interface IGracefulError {
    message: string;
    learnMore?: string;
}

export type IGracefulErrorHandlerResult =
    | Promise<IGracefulError | undefined>
    | IGracefulError
    | undefined;

export interface IGracefulErrorHandler {
    execute(
        e: Error
    ): Promise<IGracefulErrorHandlerResult | undefined> | IGracefulErrorHandlerResult | undefined;
}

export const GracefulErrorHandler = new Abstraction<IGracefulErrorHandler>("GracefulErrorHandler");

export namespace GracefulErrorHandler {
    export type Interface = IGracefulErrorHandler;
    export type Result = IGracefulErrorHandlerResult;
}
