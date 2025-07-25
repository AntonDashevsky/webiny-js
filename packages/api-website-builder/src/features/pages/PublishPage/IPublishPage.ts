import type { PublishWbPageParams, WbPage } from "~/context/pages/page.types";

export interface IPublishPage {
    execute: (params: PublishWbPageParams) => Promise<WbPage>;
}
