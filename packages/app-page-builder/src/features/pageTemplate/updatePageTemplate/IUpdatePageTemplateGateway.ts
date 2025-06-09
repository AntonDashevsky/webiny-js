import { type PageTemplateDto } from "~/features/pageTemplate/updatePageTemplate/PageTemplateDto.js";

export interface IUpdatePageTemplateGateway {
    execute(pageTemplateDto: PageTemplateDto): Promise<PageTemplateDto>;
}
