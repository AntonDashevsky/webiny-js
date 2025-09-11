import type { PageTemplateInputDto } from "./PageTemplateInputDto";
import type { PbPageTemplateWithContent } from "~/types";

export interface ICreatePageTemplateFromPageRepository {
    execute(pageId: string, pageTemplate: PageTemplateInputDto): Promise<PbPageTemplateWithContent>;
}
