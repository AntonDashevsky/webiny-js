import type { WbPage } from "~/page/page.types";

export interface IGetPageByPath {
    execute: (path: string) => Promise<WbPage | null>;
}
