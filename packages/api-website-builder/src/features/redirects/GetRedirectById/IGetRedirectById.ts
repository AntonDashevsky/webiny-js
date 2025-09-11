import type { WbRedirect } from "~/context/redirects/redirects.types.js";

export interface IGetRedirectById {
    execute: (id: string) => Promise<WbRedirect | null>;
}
