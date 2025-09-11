import type { IUpdatePageTemplateRepository } from "./IUpdatePageTemplateRepository";
import type { PbPageTemplateWithContent } from "~/types";
import type { ListCache } from "~/features/ListCache";
import type { IUpdatePageTemplateGateway } from "~/features/pageTemplate/updatePageTemplate/IUpdatePageTemplateGateway";
import type { UpdatePageTemplateDto } from "~/features/pageTemplate/updatePageTemplate/UpdatePageTemplateDto";

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
