import type { Page } from "~/domain/Page/index.js";

export interface GetPageParams {
    id: string;
}

export interface IGetPageUseCase {
    execute: (params: GetPageParams) => Promise<Page>;
}
