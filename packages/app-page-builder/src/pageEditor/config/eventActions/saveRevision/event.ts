import { BaseEventAction } from "~/editor/recoil/eventActions";
import type { SaveRevisionActionArgsType, ToggleSaveRevisionStateActionArgsType } from "./types";

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
