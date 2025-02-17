import { IHeadlessCmsLockRecordParams } from "./convertEntryToLockRecord.js";
import { getTimeout } from "./getTimeout.js";

export const calculateExpiresOn = (input: Pick<IHeadlessCmsLockRecordParams, "savedOn">): Date => {
    const timeout = getTimeout();

    const savedOn = new Date(input.savedOn);

    return new Date(savedOn.getTime() + timeout);
};
