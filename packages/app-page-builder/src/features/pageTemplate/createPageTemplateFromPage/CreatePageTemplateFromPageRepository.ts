import { type ICreatePageTemplateFromPageRepository } from "./ICreatePageTemplateFromPageRepository.js";
import { type PageTemplateInputDto } from "~/features/pageTemplate/createPageTemplateFromPage/PageTemplateInputDto.js";
import { type PbPageTemplateWithContent } from "~/types.js";
import { type ListCache } from "~/features/ListCache.js";
import { type ICreatePageTemplateFromPageGateway } from "~/features/pageTemplate/createPageTemplateFromPage/ICreatePageTemplateFromPageGateway.js";

export class CreatePageTemplateFromPageRepository implements ICreatePageTemplateFromPageRepository {
    private cache: ListCache<PbPageTemplateWithContent>;
    private gateway: ICreatePageTemplateFromPageGateway;

    constructor(
        gateway: ICreatePageTemplateFromPageGateway,
        pageTemplateCache: ListCache<PbPageTemplateWithContent>
    ) {
        this.gateway = gateway;
        this.cache = pageTemplateCache;
    }

    async execute(
        pageId: string,
        pageTemplateInput: PageTemplateInputDto
    ): Promise<PbPageTemplateWithContent> {
        const pageTemplate = await this.gateway.execute(pageId, pageTemplateInput);

        this.cache.addItems([pageTemplate]);

        return pageTemplate;
    }
}
