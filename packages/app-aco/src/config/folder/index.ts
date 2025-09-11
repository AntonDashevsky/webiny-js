import type { ActionConfig } from "./Action.js";
import { Action } from "./Action.js";

export interface FolderConfig {
    actions: ActionConfig[];
}

export const Folder = {
    Action
};
