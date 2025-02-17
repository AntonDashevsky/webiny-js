import { PageTemplateInputDto } from "./PageTemplateInputDto.js";
import { PbPageTemplateWithContent } from "~/types.js";

export interface ICreatePageTemplateGateway {
    execute(pageTemplateDto: PageTemplateInputDto): Promise<PbPageTemplateWithContent>;
}
