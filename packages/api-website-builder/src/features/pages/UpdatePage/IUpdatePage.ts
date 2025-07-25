import type { UpdateWbPageData, WbPage } from "~/context/pages/page.types";

export interface IUpdatePage {
    execute: (id: string, data: UpdateWbPageData) => Promise<WbPage>;
}
