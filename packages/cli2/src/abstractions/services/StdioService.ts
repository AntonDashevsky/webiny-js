import { Abstraction } from "@webiny/di-container";

export interface IStdioService {
    info(...args: any[]): void;

    success(...args: any[]): void;

    error(...args: any[]): void;

    warn(...args: any[]): void;

    write(...args: any[]): void;

    newLine(): void;

    getStdout(): NodeJS.WriteStream;
    getStderr(): NodeJS.WriteStream;
    getStdin(): NodeJS.ReadStream;
}

export const StdioService = new Abstraction<IStdioService>("StdioService");

export namespace StdioService {
    export type Interface = IStdioService;
}
