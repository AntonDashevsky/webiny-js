import { createScheduleActionMethods } from "./createScheduleActionMethods.js";
import { type ApwScheduleActionCrud, type CreateScheduleActionParams } from "./types.js";

export const createScheduler = (params: CreateScheduleActionParams): ApwScheduleActionCrud => {
    const { getLocale, getIdentity, getTenant, getPermission, storageOperations } = params;

    return createScheduleActionMethods({
        getLocale,
        getIdentity,
        getTenant,
        getPermission,
        storageOperations
    });
};
