import { Abstraction } from "@webiny/di-container";

export interface IMessagingService {
    info(...args: any[]): void;
    success(...args: any[]): void;
    error(...args: any[]): void;
    warn(...args: any[]): void;
}

export const MessagingService = new Abstraction<IMessagingService>("MessagingService");

export namespace MessagingService {
    export type Interface = IMessagingService;
}
