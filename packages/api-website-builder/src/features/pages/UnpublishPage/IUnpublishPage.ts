import type { UnpublishWbPageParams, WbPage } from "~/context/pages/pages.types.js";

export interface IUnpublishPage {
    execute: (params: UnpublishWbPageParams) => Promise<WbPage>;
}
