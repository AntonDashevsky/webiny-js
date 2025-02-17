import { CmsEntry, CmsModel } from "~/types/index.js";

export interface IRestoreEntryFromBin {
    execute: (model: CmsModel, id: string) => Promise<CmsEntry>;
}
