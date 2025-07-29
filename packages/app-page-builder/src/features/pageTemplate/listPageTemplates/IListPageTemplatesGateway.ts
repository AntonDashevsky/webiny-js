import type { PbPageTemplateWithContent } from "~/types";

export interface IListPageTemplatesGateway {
    execute(): Promise<PbPageTemplateWithContent[]>;
}
