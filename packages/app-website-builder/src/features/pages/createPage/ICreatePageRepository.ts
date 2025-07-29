import type { Page } from "~/domain/Page/index.js";

export interface ICreatePageRepository {
    execute: (page: Page) => Promise<Page>;
}
