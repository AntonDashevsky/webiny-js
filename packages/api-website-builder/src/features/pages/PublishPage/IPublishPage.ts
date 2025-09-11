import type { PublishWbPageParams, WbPage } from "~/context/pages/pages.types.js";

export interface IPublishPage {
    execute: (params: PublishWbPageParams) => Promise<WbPage>;
}
