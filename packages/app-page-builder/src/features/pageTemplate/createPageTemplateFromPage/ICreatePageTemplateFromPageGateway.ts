import { type PageTemplateInputDto } from "./PageTemplateInputDto.js";
import { type PbPageTemplateWithContent } from "~/types.js";

export interface ICreatePageTemplateFromPageGateway {
    execute(
        pageId: string,
        pageTemplateDto: PageTemplateInputDto
    ): Promise<PbPageTemplateWithContent>;
}
