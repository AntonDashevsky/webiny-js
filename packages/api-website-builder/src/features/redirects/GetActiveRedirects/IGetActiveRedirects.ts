import type { WbRedirect } from "~/context/redirects/redirects.types.js";

export interface IGetActiveRedirects {
    execute: () => Promise<WbRedirect[]>;
}
