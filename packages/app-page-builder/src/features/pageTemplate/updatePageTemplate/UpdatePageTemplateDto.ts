import { type PbDataBinding, type PbDataSource } from "~/types.js";

export interface UpdatePageTemplateDto {
    id: string;
    title: string;
    slug: string;
    description: string;
    tags: string[];
    layout: string;
    content: any;
    dataSources: PbDataSource[];
    dataBindings: PbDataBinding[];
}
