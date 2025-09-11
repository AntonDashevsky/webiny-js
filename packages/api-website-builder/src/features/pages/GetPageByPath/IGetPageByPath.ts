import type { WbPage } from "~/context/pages/pages.types.js";

export interface IGetPageByPath {
    execute: (path: string) => Promise<WbPage | null>;
}
