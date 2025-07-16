import { IGetPageRevisionsRepository } from "./IGetPageRevisionsRepository.js";
import { IGetPageRevisionsGateway } from "./IGetPageRevisionsGateway.js";
import { type IListCache, PageRevision } from "~/domain/PageRevision/index.js";

export class GetPageRevisionsRepository implements IGetPageRevisionsRepository {
    private cache: IListCache<PageRevision>;
    private gateway: IGetPageRevisionsGateway;

    constructor(cache: IListCache<PageRevision>, gateway: IGetPageRevisionsGateway) {
        this.cache = cache;
        this.gateway = gateway;
    }

    async execute(pageId: string) {
        const response = await this.gateway.execute(pageId);
        const revisions = response.map(revision => PageRevision.create(revision));
        this.cache.addItems(revisions);
        return revisions;
    }
}
