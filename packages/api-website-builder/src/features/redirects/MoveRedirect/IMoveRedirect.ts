import type { MoveWbRedirectParams } from "~/context/redirects/redirects.types.js";

export interface IMoveRedirect {
    execute: (params: MoveWbRedirectParams) => Promise<void>;
}
