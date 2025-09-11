import type { IRecordLockingLockRecord, IRecordLockingLockRecordEntryType } from "~/types.js";

export interface IUpdateEntryLockUseCaseExecuteParams {
    id: string;
    type: IRecordLockingLockRecordEntryType;
}

export interface IUpdateEntryLockUseCaseExecute {
    (params: IUpdateEntryLockUseCaseExecuteParams): Promise<IRecordLockingLockRecord>;
}

export interface IUpdateEntryLockUseCase {
    execute: IUpdateEntryLockUseCaseExecute;
}
