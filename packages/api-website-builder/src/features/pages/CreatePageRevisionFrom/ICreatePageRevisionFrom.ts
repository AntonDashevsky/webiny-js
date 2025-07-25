import type { CreateWbPageRevisionFromParams, WbPage } from "~/context/pages/page.types";

export interface ICreatePageRevisionFrom {
    execute: (params: CreateWbPageRevisionFromParams) => Promise<WbPage>;
}
