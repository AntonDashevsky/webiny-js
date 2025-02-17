import { IRecordLockingLockRecord, IRecordLockingLockRecordEntryType } from "~/types.js";

export interface ILockEntryUseCaseExecuteParams {
    id: string;
    type: IRecordLockingLockRecordEntryType;
}

export interface ILockEntryUseCaseExecute {
    (params: ILockEntryUseCaseExecuteParams): Promise<IRecordLockingLockRecord>;
}

export interface ILockEntryUseCase {
    execute: ILockEntryUseCaseExecute;
}
