import { PageTemplateInputDto } from "./PageTemplateInputDto.js";
import { PbPageTemplateWithContent } from "~/types.js";

export interface ICreatePageTemplateFromPageRepository {
    execute(pageId: string, pageTemplate: PageTemplateInputDto): Promise<PbPageTemplateWithContent>;
}
