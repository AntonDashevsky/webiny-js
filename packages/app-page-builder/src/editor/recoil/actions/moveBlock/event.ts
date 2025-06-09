import { type MoveBlockActionArgsType } from "./types.js";
import { BaseEventAction } from "../../eventActions/index.js";

export class MoveBlockActionEvent extends BaseEventAction<MoveBlockActionArgsType> {
    public getName(): string {
        return "MoveBlockActionEvent";
    }
}
