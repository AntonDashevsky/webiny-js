import { Abstraction } from "@webiny/di-container";

export function createAbstraction<T>(name: string) {
    return new Abstraction<T>(name);
}
