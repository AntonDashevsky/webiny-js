import { Abstraction } from "@webiny/di-container";

export interface IPulumiGetConfigPassphraseService {
    execute(): string;
}

export const PulumiGetConfigPassphraseService = new Abstraction<IPulumiGetConfigPassphraseService>(
    "PulumiGetConfigPassphraseService"
);

export namespace PulumiGetConfigPassphraseService {
    export type Interface = IPulumiGetConfigPassphraseService;
}
