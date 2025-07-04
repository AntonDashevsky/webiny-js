import { Abstraction } from "@webiny/di-container";

export interface IUiService {
    info(...args: any[]): void;

    success(...args: any[]): void;

    error(...args: any[]): void;

    warning(...args: any[]): void;

    text(...args: any[]): void;

    raw(...args: any[]): void;

    newLine(): void;
}

export const UiService = new Abstraction<IUiService>("UiService");

export namespace UiService {
    export type Interface = IUiService;
}
