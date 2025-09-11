import type { Page } from "~/domain/Page";

export interface IGetPageRepository {
    execute: (id: string) => Promise<Page>;
}
