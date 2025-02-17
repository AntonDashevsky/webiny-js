import { PageTemplateDto } from "./PageTemplateDto.js";

export interface IUpdatePageTemplateRepository {
    execute(pageTemplate: PageTemplateDto): Promise<void>;
}
