import type { IRecordLockingError, IRecordLockingLockRecord } from "~/types.js";

export interface IRecordLockingLockEntryParams {
    id: string;
    type: string;
}

export interface IRecordLockingLockEntryResult {
    data: IRecordLockingLockRecord | null;
    error: IRecordLockingError | null;
}

export interface IRecordLockingLockEntry {
    execute(params: IRecordLockingLockEntryParams): Promise<IRecordLockingLockEntryResult>;
}
