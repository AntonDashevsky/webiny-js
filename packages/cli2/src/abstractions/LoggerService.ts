import { Abstraction } from "@webiny/di-container";

export interface ILoggerService {
    log(...args: any[]): void;

    info(...args: any[]): void;

    warn(...args: any[]): void;

    error(...args: any[]): void;
}

export const LoggerServiceAbstraction = new Abstraction<ILoggerService>("LoggerService");
