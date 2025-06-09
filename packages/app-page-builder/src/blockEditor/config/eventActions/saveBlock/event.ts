import { BaseEventAction } from "~/editor/recoil/eventActions/index.js";
import { type SaveBlockActionArgsType } from "./types.js";

export class SaveBlockActionEvent extends BaseEventAction<SaveBlockActionArgsType> {
    public getName(): string {
        return "SaveBlockActionEvent";
    }
}
