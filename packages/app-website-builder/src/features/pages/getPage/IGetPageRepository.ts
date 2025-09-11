import type { Page } from "~/domain/Page/index.js";

export interface IGetPageRepository {
    execute: (id: string) => Promise<Page>;
}
