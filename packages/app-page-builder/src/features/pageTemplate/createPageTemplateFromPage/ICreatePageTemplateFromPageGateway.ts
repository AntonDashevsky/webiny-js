import { PageTemplateInputDto } from "./PageTemplateInputDto.js";
import { PbPageTemplateWithContent } from "~/types.js";

export interface ICreatePageTemplateFromPageGateway {
    execute(
        pageId: string,
        pageTemplateDto: PageTemplateInputDto
    ): Promise<PbPageTemplateWithContent>;
}
