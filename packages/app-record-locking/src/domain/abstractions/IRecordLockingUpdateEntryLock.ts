import { type IRecordLockingError, type IRecordLockingLockRecord } from "~/types.js";

export interface IRecordLockingUpdateEntryLockExecuteParams {
    id: string;
    type: string;
}
export interface IRecordLockingUpdateEntryLockExecuteResult {
    data: IRecordLockingLockRecord | null;
    error: IRecordLockingError | null;
}

export interface IRecordLockingUpdateEntryLock {
    execute(
        params: IRecordLockingUpdateEntryLockExecuteParams
    ): Promise<IRecordLockingUpdateEntryLockExecuteResult>;
}
