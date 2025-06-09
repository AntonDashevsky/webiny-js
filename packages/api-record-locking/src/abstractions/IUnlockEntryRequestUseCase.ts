import { type IRecordLockingLockRecord, type IRecordLockingLockRecordEntryType } from "~/types.js";

export interface IUnlockEntryRequestUseCaseExecuteParams {
    id: string;
    type: IRecordLockingLockRecordEntryType;
}

export interface IUnlockEntryRequestUseCaseExecute {
    (params: IUnlockEntryRequestUseCaseExecuteParams): Promise<IRecordLockingLockRecord>;
}

export interface IUnlockEntryRequestUseCase {
    execute: IUnlockEntryRequestUseCaseExecute;
}
