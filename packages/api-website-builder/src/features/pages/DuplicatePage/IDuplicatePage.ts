import type { DuplicateWbPageParams, WbPage } from "~/context/pages/pages.types.js";

export interface IDuplicatePage {
    execute: (params: DuplicateWbPageParams) => Promise<WbPage>;
}
