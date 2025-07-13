import { PageRevision } from "~/domains/PageRevision";

export interface IGetPageRevisionsRepository {
    execute: (pageId: string) => Promise<PageRevision[]>;
}
