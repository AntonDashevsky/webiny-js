import type { ICreatePageTemplateRepository } from "./ICreatePageTemplateRepository";
import type { PageTemplateInputDto } from "~/features/pageTemplate/createPageTemplate/PageTemplateInputDto";
import type { ICreatePageTemplateGateway } from "~/features/pageTemplate/createPageTemplate/ICreatePageTemplateGateway";
import type { PbPageTemplateWithContent } from "~/types";
import type { ListCache } from "~/features/ListCache";

export class CreatePageTemplateRepository implements ICreatePageTemplateRepository {
    private cache: ListCache<PbPageTemplateWithContent>;
    private gateway: ICreatePageTemplateGateway;

    constructor(
        gateway: ICreatePageTemplateGateway,
        pageTemplateCache: ListCache<PbPageTemplateWithContent>
    ) {
        this.gateway = gateway;
        this.cache = pageTemplateCache;
    }

    async execute(pageTemplateInput: PageTemplateInputDto): Promise<PbPageTemplateWithContent> {
        // A naive implementation for the time being.
        const pageTemplate = await this.gateway.execute(pageTemplateInput);

        this.cache.addItems([
            {
                ...pageTemplate,
                tags: pageTemplate.tags || [],
                dataSources: pageTemplate.dataSources || [],
                dataBindings: pageTemplate.dataBindings || []
            }
        ]);

        return pageTemplate;
    }
}
