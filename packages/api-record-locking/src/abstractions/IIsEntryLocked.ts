import { type IRecordLockingIsLockedParams } from "~/types.js";

export type IIsEntryLockedUseCaseExecuteParams = IRecordLockingIsLockedParams;

export interface IIsEntryLockedUseCaseExecute {
    (params: IIsEntryLockedUseCaseExecuteParams): Promise<boolean>;
}

export interface IIsEntryLockedUseCase {
    execute: IIsEntryLockedUseCaseExecute;
}
