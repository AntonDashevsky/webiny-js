import { type CmsModel } from "@webiny/api-headless-cms/types/index.js";

export interface IProcessEntry {
    execute: (model: CmsModel, id: string, data?: any) => Promise<void>;
}
