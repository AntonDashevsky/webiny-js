import type { PageRevision } from "~/domain/PageRevision/index.js";

export interface IGetPageRevisionsRepository {
    execute: (pageId: string) => Promise<PageRevision[]>;
}
