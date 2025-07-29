import type { PageRevision } from "~/domain/PageRevision";

export interface GetPageRevisionsParams {
    entryId: string;
}

export interface IGetPageRevisionsUseCase {
    execute: (params: GetPageRevisionsParams) => Promise<PageRevision[]>;
}
