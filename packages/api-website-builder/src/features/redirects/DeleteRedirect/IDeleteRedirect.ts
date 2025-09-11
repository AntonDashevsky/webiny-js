import type { DeleteWbRedirectParams } from "~/context/redirects/redirects.types.js";

export interface IDeleteRedirect {
    execute: (params: DeleteWbRedirectParams) => Promise<void>;
}
