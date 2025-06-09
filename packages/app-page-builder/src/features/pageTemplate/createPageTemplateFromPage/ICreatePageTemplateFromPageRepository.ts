import { type PageTemplateInputDto } from "./PageTemplateInputDto.js";
import { type PbPageTemplateWithContent } from "~/types.js";

export interface ICreatePageTemplateFromPageRepository {
    execute(pageId: string, pageTemplate: PageTemplateInputDto): Promise<PbPageTemplateWithContent>;
}
