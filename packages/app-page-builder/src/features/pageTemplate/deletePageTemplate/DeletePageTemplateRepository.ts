import { type IDeletePageTemplateRepository } from "./IDeletePageTemplateRepository.js";
import { type PbPageTemplate } from "~/types.js";
import { type ListCache } from "~/features/ListCache.js";
import { type IDeletePageTemplateGateway } from "~/features/pageTemplate/deletePageTemplate/IDeletePageTemplateGateway.js";

export class DeletePageTemplateRepository implements IDeletePageTemplateRepository {
    private cache: ListCache<PbPageTemplate>;
    private gateway: IDeletePageTemplateGateway;

    constructor(gateway: IDeletePageTemplateGateway, pageTemplateCache: ListCache<PbPageTemplate>) {
        this.gateway = gateway;
        this.cache = pageTemplateCache;
    }

    async execute(pageTemplateId: string): Promise<void> {
        await this.gateway.execute(pageTemplateId);

        this.cache.removeItems(item => item.id === pageTemplateId);
    }
}
