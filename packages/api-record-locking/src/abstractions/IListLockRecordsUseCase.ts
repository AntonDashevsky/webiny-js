import type { IListAllLockRecordsUseCaseExecuteParams } from "./IListAllLockRecordsUseCase";
import type { IRecordLockingListAllLockRecordsResponse } from "~/types";

export type IListLockRecordsUseCaseExecuteParams = IListAllLockRecordsUseCaseExecuteParams;

export type IListLockRecordsUseCaseExecuteResponse = IRecordLockingListAllLockRecordsResponse;

export interface IListLockRecordsUseCaseExecute {
    (params: IListLockRecordsUseCaseExecuteParams): Promise<IListLockRecordsUseCaseExecuteResponse>;
}

export interface IListLockRecordsUseCase {
    execute: IListLockRecordsUseCaseExecute;
}
