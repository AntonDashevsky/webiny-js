import { PbPageTemplateWithContent } from "~/types.js";

export interface IListPageTemplatesGateway {
    execute(): Promise<PbPageTemplateWithContent[]>;
}
