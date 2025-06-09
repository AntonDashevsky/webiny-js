import { type IListAllLockRecordsUseCaseExecuteParams } from "./IListAllLockRecordsUseCase.js";
import { type IRecordLockingListAllLockRecordsResponse } from "~/types.js";

export type IListLockRecordsUseCaseExecuteParams = IListAllLockRecordsUseCaseExecuteParams;

export type IListLockRecordsUseCaseExecuteResponse = IRecordLockingListAllLockRecordsResponse;

export interface IListLockRecordsUseCaseExecute {
    (params: IListLockRecordsUseCaseExecuteParams): Promise<IListLockRecordsUseCaseExecuteResponse>;
}

export interface IListLockRecordsUseCase {
    execute: IListLockRecordsUseCaseExecute;
}
