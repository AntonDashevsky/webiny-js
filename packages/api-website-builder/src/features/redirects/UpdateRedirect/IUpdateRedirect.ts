import type { UpdateWbRedirectData, WbRedirect } from "~/context/redirects/redirects.types.js";

export interface IUpdateRedirect {
    execute: (id: string, data: UpdateWbRedirectData) => Promise<WbRedirect>;
}
