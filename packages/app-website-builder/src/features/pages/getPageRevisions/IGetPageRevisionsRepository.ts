import type { PageRevision } from "~/domain/PageRevision";

export interface IGetPageRevisionsRepository {
    execute: (pageId: string) => Promise<PageRevision[]>;
}
