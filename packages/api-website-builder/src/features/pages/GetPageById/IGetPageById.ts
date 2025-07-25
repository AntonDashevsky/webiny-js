import type { GetWbPageParams, WbPage } from "~/context/pages/page.types";

export interface IGetPageById {
    execute: (id: string) => Promise<WbPage | null>;
}
