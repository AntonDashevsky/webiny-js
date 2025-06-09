import { type MoveElementActionArgsType } from "./types.js";
import { BaseEventAction } from "../../eventActions/index.js";

export class MoveElementActionEvent extends BaseEventAction<MoveElementActionArgsType> {
    public getName(): string {
        return "MoveElementActionEvent";
    }
}
