import type { Context as BaseContext } from "~/types";

export interface Context extends BaseContext {
    someMockProperty: string;
}
