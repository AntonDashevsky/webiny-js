import type { CreateWbPageData, WbPage } from "~/context/pages/pages.types.js";

export interface ICreatePage {
    execute: (data: CreateWbPageData) => Promise<WbPage>;
}
