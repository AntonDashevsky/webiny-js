import type { PageTemplateInputDto } from "./PageTemplateInputDto";
import type { PbPageTemplateWithContent } from "~/types";

export interface ICreatePageTemplateFromPageGateway {
    execute(
        pageId: string,
        pageTemplateDto: PageTemplateInputDto
    ): Promise<PbPageTemplateWithContent>;
}
