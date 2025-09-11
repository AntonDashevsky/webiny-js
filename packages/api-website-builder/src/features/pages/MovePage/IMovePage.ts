import type { MoveWbPageParams } from "~/context/pages/pages.types.js";

export interface IMovePage {
    execute: (params: MoveWbPageParams) => Promise<void>;
}
