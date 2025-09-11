import type { PageTemplateInputDto } from "./PageTemplateInputDto";
import type { PbPageTemplateWithContent } from "~/types";

export interface ICreatePageTemplateRepository {
    execute(pageTemplate: PageTemplateInputDto): Promise<PbPageTemplateWithContent>;
}
