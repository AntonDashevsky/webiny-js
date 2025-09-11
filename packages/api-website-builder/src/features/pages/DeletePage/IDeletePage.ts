import type { DeleteWbPageParams } from "~/context/pages/pages.types.js";

export interface IDeletePage {
    execute: (params: DeleteWbPageParams) => Promise<void>;
}
