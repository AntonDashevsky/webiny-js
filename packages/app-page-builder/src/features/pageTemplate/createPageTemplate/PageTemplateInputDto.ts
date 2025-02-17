import type { GenericRecord } from "@webiny/app/types.js";
import type { PbDataBinding, PbDataSource } from "~/types.js";

export interface PageTemplateInputDto {
    title: string;
    slug: string;
    description: string;
    tags: string[];
    layout: string;
    content?: GenericRecord;
    dataSources?: PbDataSource[];
    dataBindings?: PbDataBinding[];
}
