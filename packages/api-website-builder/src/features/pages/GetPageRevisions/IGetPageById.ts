import type { WbPage } from "~/context/pages/pages.types.js";

export interface IGetPageRevisions {
    execute: (pageId: string) => Promise<WbPage[]>;
}
