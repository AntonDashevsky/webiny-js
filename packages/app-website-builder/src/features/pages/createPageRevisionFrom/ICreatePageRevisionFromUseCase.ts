import type { Page } from "~/domain/Page/index.js";

export interface CreatePageRevisionFromParams {
    id: string;
}

export interface ICreatePageRevisionFromUseCase {
    execute: (params: CreatePageRevisionFromParams) => Promise<Page>;
}
