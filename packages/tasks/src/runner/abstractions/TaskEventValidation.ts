import type { ITaskEvent } from "~/handler/types.js";

export type ITaskEventValidationResult = ITaskEvent;

export interface ITaskEventValidation {
    validate: (event: Partial<ITaskEvent>) => ITaskEventValidationResult;
}
