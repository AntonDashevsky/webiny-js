import { Abstraction } from "@webiny/di-container";

export interface IUiService {
    raw(text: string): void;

    text(text: string): void;

    newLine(): void;

    info(text: string, ...args: any[]): void;

    success(text: string, ...args: any[]): void;

    error(text: string, ...args: any[]): void;

    warning(text: string, ...args: any[]): void;
}

export const UiService = new Abstraction<IUiService>("UiService");

export namespace UiService {
    export type Interface = IUiService;
}
