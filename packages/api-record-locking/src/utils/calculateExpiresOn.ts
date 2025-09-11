import type { IHeadlessCmsLockRecordParams } from "./convertEntryToLockRecord.js";

export const calculateExpiresOn = (
    input: Pick<IHeadlessCmsLockRecordParams, "savedOn">,
    timeout: number
): Date => {
    if (!input.savedOn) {
        throw new Error("Missing savedOn property.");
    }
    const savedOn = new Date(input.savedOn);

    return new Date(savedOn.getTime() + timeout);
};
