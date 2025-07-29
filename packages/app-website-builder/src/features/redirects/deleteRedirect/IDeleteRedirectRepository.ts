import type { Redirect } from "~/domain/Redirect/index.js";

export interface IDeleteRedirectRepository {
    execute: (page: Redirect) => Promise<void>;
}
