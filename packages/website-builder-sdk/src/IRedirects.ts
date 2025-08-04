import type { PublicRedirect } from "~/types";

export interface IRedirects {
    getAllRedirects(): Promise<Map<string, PublicRedirect>>;
    getRedirectByPath(path: string): Promise<PublicRedirect | undefined>;
}
