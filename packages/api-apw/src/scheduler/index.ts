import { createScheduleActionMethods } from "./createScheduleActionMethods";
import type { ApwScheduleActionCrud, CreateScheduleActionParams } from "./types";

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
