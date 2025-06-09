import { type PageTemplateInputDto } from "./PageTemplateInputDto.js";
import { type PbPageTemplateWithContent } from "~/types.js";

export interface ICreatePageTemplateGateway {
    execute(pageTemplateDto: PageTemplateInputDto): Promise<PbPageTemplateWithContent>;
}
