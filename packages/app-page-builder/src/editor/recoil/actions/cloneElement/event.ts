import { BaseEventAction } from "~/editor/recoil/eventActions/index.js";
import { type CloneElementActionArgsType } from "./types.js";

export class CloneElementActionEvent extends BaseEventAction<CloneElementActionArgsType> {
    public getName(): string {
        return "CloneElementActionEvent";
    }
}
