import type { Page } from "~/domain/Page";

export interface CreatePageRevisionFromParams {
    id: string;
}

export interface ICreatePageRevisionFromUseCase {
    execute: (params: CreatePageRevisionFromParams) => Promise<Page>;
}
