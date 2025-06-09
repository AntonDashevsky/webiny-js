import { type IUpdatePageTemplateRepository } from "./IUpdatePageTemplateRepository.js";
import { type PbPageTemplateWithContent } from "~/types.js";
import { type ListCache } from "~/features/ListCache.js";
import { type IUpdatePageTemplateGateway } from "~/features/pageTemplate/updatePageTemplate/IUpdatePageTemplateGateway.js";
import { type UpdatePageTemplateDto } from "~/features/pageTemplate/updatePageTemplate/UpdatePageTemplateDto.js";

export class UpdatePageTemplateRepository implements IUpdatePageTemplateRepository {
    private cache: ListCache<PbPageTemplateWithContent>;
    private gateway: IUpdatePageTemplateGateway;

    constructor(
        gateway: IUpdatePageTemplateGateway,
        pageTemplateCache: ListCache<PbPageTemplateWithContent>
    ) {
        this.gateway = gateway;
        this.cache = pageTemplateCache;
    }

    async execute(pageTemplate: UpdatePageTemplateDto): Promise<void> {
        // A naive implementation for the time being.
        const updatedTemplate = await this.gateway.execute(pageTemplate);

        this.cache.updateItems(item => {
            if (item.id === updatedTemplate.id) {
                return {
                    ...item,
                    ...updatedTemplate
                };
            }
            return item;
        });
    }
}
