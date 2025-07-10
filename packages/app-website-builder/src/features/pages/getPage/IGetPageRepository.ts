import { Page } from "~/domains/Page";

export interface IGetPageRepository {
    execute: (id: string) => Promise<Page>;
}
