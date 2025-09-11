import type { WbPage } from "~/context/pages/pages.types.js";

export interface IGetPageById {
    execute: (id: string) => Promise<WbPage | null>;
}
