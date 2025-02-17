import { ICreatePageTemplateFromPageRepository } from "./ICreatePageTemplateFromPageRepository.js";
import { PageTemplateInputDto } from "~/features/pageTemplate/createPageTemplateFromPage/PageTemplateInputDto.js";
import { PbPageTemplateWithContent } from "~/types.js";
import { ListCache } from "~/features/ListCache.js";
import { ICreatePageTemplateFromPageGateway } from "~/features/pageTemplate/createPageTemplateFromPage/ICreatePageTemplateFromPageGateway.js";

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
