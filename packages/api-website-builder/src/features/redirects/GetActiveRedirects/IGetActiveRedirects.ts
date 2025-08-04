import type { WbRedirect } from "~/context/redirects/redirects.types";

export interface IGetActiveRedirects {
    execute: () => Promise<WbRedirect[]>;
}
