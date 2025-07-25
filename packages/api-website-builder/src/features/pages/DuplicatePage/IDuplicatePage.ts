import type { DuplicateWbPageParams, WbPage } from "~/context/pages/page.types";

export interface IDuplicatePage {
    execute: (params: DuplicateWbPageParams) => Promise<WbPage>;
}
