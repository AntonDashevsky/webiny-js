import type { GetWbPageParams, WbPage } from "~/page/page.types";

export interface IGetPageById {
    execute: (id: string) => Promise<WbPage | null>;
}
