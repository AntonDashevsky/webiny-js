import type { CmsEntry } from "@webiny/api-headless-cms/types/index.js";
import type { IRecordLockingLockRecord, IRecordLockingLockRecordValues } from "~/types.js";

export interface ConvertEntryToLockRecordCb {
    (entry: CmsEntry<IRecordLockingLockRecordValues>): IRecordLockingLockRecord;
}
