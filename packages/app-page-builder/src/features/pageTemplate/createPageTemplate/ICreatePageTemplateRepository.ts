import { PageTemplateInputDto } from "./PageTemplateInputDto.js";
import { PbPageTemplateWithContent } from "~/types.js";

export interface ICreatePageTemplateRepository {
    execute(pageTemplate: PageTemplateInputDto): Promise<PbPageTemplateWithContent>;
}
