import type { WbPage } from "~/page/page.types";

export interface IGetPageRevisions {
    execute: (pageId: string) => Promise<WbPage[]>;
}
