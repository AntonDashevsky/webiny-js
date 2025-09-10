import { describe, it, expect } from "vitest";
import { UnlockEntryRequestUseCase } from "~/useCases/UnlockRequestUseCase/UnlockEntryRequestUseCase";
import { IGetLockRecordUseCase } from "~/abstractions/IGetLockRecordUseCase";
import { getSecurityIdentity } from "~tests/helpers/identity";
import { WebinyError } from "@webiny/error";
import { createConvert } from "~tests/mocks/createConvert";
import { createGetSecurity } from "~tests/mocks/createGetSecurity";
import { createGetManager } from "~tests/mocks/createGetManager";

describe("unlock entry request use case", () => {
    it("should throw an error on missing lock record", async () => {
        expect.assertions(1);
        const useCase = new UnlockEntryRequestUseCase({
            getLockRecordUseCase: {
                execute: async () => {
                    return null;
                }
            } as unknown as IGetLockRecordUseCase,
            getIdentity: getSecurityIdentity,
            getManager: createGetManager(),
            getSecurity: createGetSecurity(),
            convert: createConvert()
        });

        try {
            await useCase.execute({ id: "id", type: "type" });
        } catch (ex) {
            expect(ex).toEqual(
                new WebinyError("Entry is not locked.", "ENTRY_NOT_LOCKED", {
                    id: "id",
                    type: "type"
                })
            );
        }
    });

    it("should throw an error if current user did not start the unlock request", async () => {
        expect.assertions(1);
        const useCase = new UnlockEntryRequestUseCase({
            getLockRecordUseCase: {
                execute: async () => {
                    return {
                        getUnlockRequested() {
                            return {
                                createdBy: {
                                    id: "other-user-id"
                                },
                                isExpired() {
                                    return false;
                                }
                            };
                        },
                        isExpired() {
                            return false;
                        }
                    };
                }
            } as unknown as IGetLockRecordUseCase,
            getIdentity: getSecurityIdentity,
            getManager: createGetManager(),
            getSecurity: createGetSecurity(),
            convert: createConvert()
        });

        try {
            await useCase.execute({ id: "id", type: "type" });
        } catch (ex) {
            expect(ex).toEqual(
                new WebinyError("Unlock request already sent.", "UNLOCK_REQUEST_ALREADY_SENT", {
                    id: "id",
                    type: "type",
                    identity: {
                        id: "other-user-id"
                    }
                })
            );
        }
    });

    it("should return the lock record if unlock request was already approved", async () => {
        expect.assertions(1);
        const useCase = new UnlockEntryRequestUseCase({
            getLockRecordUseCase: {
                execute: async () => {
                    return {
                        id: "wby-lm-aTestIdValue",
                        getUnlockRequested() {
                            return {
                                createdBy: getSecurityIdentity()
                            };
                        },
                        getUnlockApproved() {
                            return {};
                        },
                        getUnlockDenied() {
                            return null;
                        },
                        isExpired() {
                            return false;
                        }
                    };
                }
            } as unknown as IGetLockRecordUseCase,
            getIdentity: getSecurityIdentity,
            getManager: createGetManager(),
            getSecurity: createGetSecurity(),
            convert: createConvert()
        });

        const result = await useCase.execute({ id: "aTestIdValue#0001", type: "type" });
        expect(result.id).toEqual("wby-lm-aTestIdValue");
    });
});
