import type { DeleteWbPageParams } from "~/context/pages/page.types";

export interface IDeletePage {
    execute: (params: DeleteWbPageParams) => Promise<void>;
}
