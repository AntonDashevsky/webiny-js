import type { PageTemplateInputDto } from "./PageTemplateInputDto";
import type { PbPageTemplateWithContent } from "~/types";

export interface ICreatePageTemplateGateway {
    execute(pageTemplateDto: PageTemplateInputDto): Promise<PbPageTemplateWithContent>;
}
