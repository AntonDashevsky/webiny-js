import type { PageRevision } from "~/domain/PageRevision/index.js";

export interface GetPageRevisionsParams {
    entryId: string;
}

export interface IGetPageRevisionsUseCase {
    execute: (params: GetPageRevisionsParams) => Promise<PageRevision[]>;
}
