import { IRecordLockingGetLockRecordParams, IRecordLockingLockRecord } from "~/types.js";

export type IGetLockRecordUseCaseExecuteParams = IRecordLockingGetLockRecordParams;

export interface IGetLockRecordUseCaseExecute {
    (params: IGetLockRecordUseCaseExecuteParams): Promise<IRecordLockingLockRecord | null>;
}

export interface IGetLockRecordUseCase {
    execute: IGetLockRecordUseCaseExecute;
}
