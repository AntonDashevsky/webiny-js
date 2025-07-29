import type { Page } from "~/domain/Page";

export interface GetPageParams {
    id: string;
}

export interface IGetPageUseCase {
    execute: (params: GetPageParams) => Promise<Page>;
}
