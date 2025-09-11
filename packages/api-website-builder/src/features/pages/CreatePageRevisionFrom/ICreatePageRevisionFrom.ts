import type { CreateWbPageRevisionFromParams, WbPage } from "~/context/pages/pages.types.js";

export interface ICreatePageRevisionFrom {
    execute: (params: CreateWbPageRevisionFromParams) => Promise<WbPage>;
}
