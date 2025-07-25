import type { MoveWbPageParams } from "~/context/pages/page.types";

export interface IMovePage {
    execute: (params: MoveWbPageParams) => Promise<void>;
}
