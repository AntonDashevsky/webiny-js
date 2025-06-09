import {
    type IRecordLockingListAllLockRecordsParams,
    type IRecordLockingListAllLockRecordsResponse
} from "~/types.js";

export type IListAllLockRecordsUseCaseExecuteParams = IRecordLockingListAllLockRecordsParams;

export type IListAllLockRecordsUseCaseExecuteResponse = IRecordLockingListAllLockRecordsResponse;

export interface IListAllLockRecordsUseCaseExecute {
    (
        params: IListAllLockRecordsUseCaseExecuteParams
    ): Promise<IListAllLockRecordsUseCaseExecuteResponse>;
}

export interface IListAllLockRecordsUseCase {
    execute: IListAllLockRecordsUseCaseExecute;
}
