import { BaseEventAction } from "~/editor/recoil/eventActions/index.js";
import { type SaveRevisionActionArgsType, type ToggleSaveRevisionStateActionArgsType } from "./types.js";

export class SaveRevisionActionEvent extends BaseEventAction<SaveRevisionActionArgsType> {
    public getName(): string {
        return "SaveRevisionActionEvent";
    }
}

export class ToggleSaveRevisionStateActionEvent extends BaseEventAction<ToggleSaveRevisionStateActionArgsType> {
    public getName(): string {
        return "ToggleSaveRevisionStateActionEvent";
    }
}
