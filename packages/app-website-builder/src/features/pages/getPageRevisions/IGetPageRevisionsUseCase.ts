import { PageRevision } from "~/domains/PageRevision";

export interface GetPageRevisionsParams {
    pageId: string;
}

export interface IGetPageRevisionsUseCase {
    execute: (params: GetPageRevisionsParams) => Promise<PageRevision[]>;
}
