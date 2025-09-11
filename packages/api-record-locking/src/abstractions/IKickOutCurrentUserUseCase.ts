import type { IRecordLockingLockRecord } from "~/types.js";

export type IKickOutCurrentUserUseCaseExecuteParams = IRecordLockingLockRecord;

export interface IKickOutCurrentUserUseCase {
    execute(params: IKickOutCurrentUserUseCaseExecuteParams): Promise<void>;
}
