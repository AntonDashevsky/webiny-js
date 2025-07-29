import type { Plugin } from "@webiny/plugins/types";
import { createBackgroundTaskContext, createBackgroundTaskGraphQL } from "@webiny/tasks";

export const createBackgroundTasks = (): Plugin[] => {
    return [...createBackgroundTaskContext(), ...createBackgroundTaskGraphQL()];
};
