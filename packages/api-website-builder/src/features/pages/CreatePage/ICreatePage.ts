import type { CreateWbPageData, WbPage } from "~/context/pages/page.types";

export interface ICreatePage {
    execute: (data: CreateWbPageData) => Promise<WbPage>;
}
