import { type PageTemplateInputDto } from "./PageTemplateInputDto.js";
import { type PbPageTemplateWithContent } from "~/types.js";

export interface ICreatePageTemplateRepository {
    execute(pageTemplate: PageTemplateInputDto): Promise<PbPageTemplateWithContent>;
}
