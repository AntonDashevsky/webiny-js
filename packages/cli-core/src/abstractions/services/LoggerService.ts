import { Abstraction } from "@webiny/di-container";

export interface ILoggerService {
    // Basic levels
    trace(objOrMsg: object | string, ...args: any[]): void;
    debug(objOrMsg: object | string, ...args: any[]): void;
    info(objOrMsg: object | string, ...args: any[]): void;
    warn(objOrMsg: object | string, ...args: any[]): void;
    error(objOrMsg: object | string, ...args: any[]): void;
    fatal(objOrMsg: object | string, ...args: any[]): void;

    // Generic log (can default to 'info')
    log(objOrMsg: object | string, ...args: any[]): void;
}

export const LoggerService = new Abstraction<ILoggerService>("LoggerService");

export namespace LoggerService {
    export type Interface = ILoggerService;
}
