import { Abstraction } from "@webiny/di-container";

interface ILoggerService {
    log(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}

export const LoggerService = new Abstraction<ILoggerService>("LoggerService");

export namespace LoggerService {
    export type Interface = ILoggerService;
}
