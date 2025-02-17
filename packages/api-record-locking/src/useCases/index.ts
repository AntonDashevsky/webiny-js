import {
    IGetIdentity,
    IGetWebsocketsContextCallable,
    IHasFullAccessCallable,
    IRecordLockingModelManager
} from "~/types.js";
import { GetLockRecordUseCase } from "./GetLockRecord/GetLockRecordUseCase.js";
import { IsEntryLockedUseCase } from "./IsEntryLocked/IsEntryLockedUseCase.js";
import { LockEntryUseCase } from "./LockEntryUseCase/LockEntryUseCase.js";
import { UnlockEntryUseCase } from "./UnlockEntryUseCase/UnlockEntryUseCase.js";
import { UnlockEntryRequestUseCase } from "./UnlockRequestUseCase/UnlockEntryRequestUseCase.js";
import { ListAllLockRecordsUseCase } from "./ListAllLockRecordsUseCase/ListAllLockRecordsUseCase.js";
import { ListLockRecordsUseCase } from "./ListLockRecordsUseCase/ListLockRecordsUseCase.js";
import { isLockedFactory } from "~/utils/isLockedFactory.js";
import { UpdateEntryLockUseCase } from "~/useCases/UpdateEntryLock/UpdateEntryLockUseCase.js";
import { getTimeout } from "~/utils/getTimeout.js";
import { KickOutCurrentUserUseCase } from "./KickOutCurrentUser/KickOutCurrentUserUseCase.js";
import { GetLockedEntryLockRecordUseCase } from "~/useCases/GetLockedEntryLockRecord/GetLockedEntryLockRecordUseCase.js";
import { IListAllLockRecordsUseCase } from "~/abstractions/IListAllLockRecordsUseCase.js";
import { IListLockRecordsUseCase } from "~/abstractions/IListLockRecordsUseCase.js";
import { IGetLockRecordUseCase } from "~/abstractions/IGetLockRecordUseCase.js";
import { IIsEntryLockedUseCase } from "~/abstractions/IIsEntryLocked.js";
import { IGetLockedEntryLockRecordUseCase } from "~/abstractions/IGetLockedEntryLockRecordUseCase.js";
import { ILockEntryUseCase } from "~/abstractions/ILockEntryUseCase.js";
import { IUpdateEntryLockUseCase } from "~/abstractions/IUpdateEntryLockUseCase.js";
import { IUnlockEntryUseCase } from "~/abstractions/IUnlockEntryUseCase.js";
import { IUnlockEntryRequestUseCase } from "~/abstractions/IUnlockEntryRequestUseCase.js";

export interface ICreateUseCasesParams {
    getIdentity: IGetIdentity;
    getManager(): Promise<IRecordLockingModelManager>;
    hasFullAccess: IHasFullAccessCallable;
    getWebsockets: IGetWebsocketsContextCallable;
}

export interface ICreateUseCasesResponse {
    listAllLockRecordsUseCase: IListAllLockRecordsUseCase;
    listLockRecordsUseCase: IListLockRecordsUseCase;
    getLockRecordUseCase: IGetLockRecordUseCase;
    isEntryLockedUseCase: IIsEntryLockedUseCase;
    getLockedEntryLockRecordUseCase: IGetLockedEntryLockRecordUseCase;
    lockEntryUseCase: ILockEntryUseCase;
    updateEntryLockUseCase: IUpdateEntryLockUseCase;
    unlockEntryUseCase: IUnlockEntryUseCase;
    unlockEntryRequestUseCase: IUnlockEntryRequestUseCase;
}

export const createUseCases = (params: ICreateUseCasesParams): ICreateUseCasesResponse => {
    const timeout = getTimeout();
    const isLocked = isLockedFactory(timeout);

    const listAllLockRecordsUseCase = new ListAllLockRecordsUseCase({
        getManager: params.getManager
    });

    const listLockRecordsUseCase = new ListLockRecordsUseCase({
        listAllLockRecordsUseCase,
        timeout,
        getIdentity: params.getIdentity
    });

    const getLockRecordUseCase = new GetLockRecordUseCase({
        getManager: params.getManager
    });

    const isEntryLockedUseCase = new IsEntryLockedUseCase({
        getLockRecordUseCase,
        isLocked,
        getIdentity: params.getIdentity
    });

    const getLockedEntryLockRecordUseCase = new GetLockedEntryLockRecordUseCase({
        getLockRecordUseCase,
        isLocked,
        getIdentity: params.getIdentity
    });

    const lockEntryUseCase = new LockEntryUseCase({
        isEntryLockedUseCase,
        getManager: params.getManager
    });

    const updateEntryLockUseCase = new UpdateEntryLockUseCase({
        getLockRecordUseCase,
        lockEntryUseCase,
        getManager: params.getManager,
        getIdentity: params.getIdentity
    });

    const kickOutCurrentUserUseCase = new KickOutCurrentUserUseCase({
        getWebsockets: params.getWebsockets,
        getIdentity: params.getIdentity
    });

    const unlockEntryUseCase = new UnlockEntryUseCase({
        getLockRecordUseCase,
        kickOutCurrentUserUseCase,
        getManager: params.getManager,
        getIdentity: params.getIdentity,
        hasFullAccess: params.hasFullAccess
    });

    const unlockEntryRequestUseCase = new UnlockEntryRequestUseCase({
        getLockRecordUseCase,
        getIdentity: params.getIdentity,
        getManager: params.getManager
    });

    return {
        listAllLockRecordsUseCase,
        listLockRecordsUseCase,
        getLockRecordUseCase,
        isEntryLockedUseCase,
        getLockedEntryLockRecordUseCase,
        lockEntryUseCase,
        updateEntryLockUseCase,
        unlockEntryUseCase,
        unlockEntryRequestUseCase
    };
};
