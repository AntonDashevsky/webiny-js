import type { UnpublishWbPageParams, WbPage } from "~/context/pages/page.types";

export interface IUnpublishPage {
    execute: (params: UnpublishWbPageParams) => Promise<WbPage>;
}
