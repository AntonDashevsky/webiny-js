import { type IRecordLockingIsLockedParams, type IRecordLockingLockRecord } from "~/types.js";

export type IGetLockedEntryLockRecordUseCaseExecuteParams = IRecordLockingIsLockedParams;

export interface IGetLockedEntryLockRecordUseCaseExecute {
    (
        params: IGetLockedEntryLockRecordUseCaseExecuteParams
    ): Promise<IRecordLockingLockRecord | null>;
}

export interface IGetLockedEntryLockRecordUseCase {
    execute: IGetLockedEntryLockRecordUseCaseExecute;
}
