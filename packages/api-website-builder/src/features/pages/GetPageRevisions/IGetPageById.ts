import type { WbPage } from "~/context/pages/page.types";

export interface IGetPageRevisions {
    execute: (pageId: string) => Promise<WbPage[]>;
}
