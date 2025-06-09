import { type PbPageTemplateWithContent } from "~/types.js";

export interface IListPageTemplatesRepository {
    getLoading(): boolean;
    getPageTemplates(): PbPageTemplateWithContent[];
    execute(): Promise<PbPageTemplateWithContent[]>;
}
