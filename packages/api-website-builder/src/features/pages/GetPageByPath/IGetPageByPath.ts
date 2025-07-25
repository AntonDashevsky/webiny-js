import type { WbPage } from "~/context/pages/page.types";

export interface IGetPageByPath {
    execute: (path: string) => Promise<WbPage | null>;
}
