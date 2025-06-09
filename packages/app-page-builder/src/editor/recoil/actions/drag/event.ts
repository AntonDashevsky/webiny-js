import { type DragStartActionArgsType, type DragEndActionArgsType } from "./types.js";
import { BaseEventAction } from "../../eventActions/index.js";

export class DragStartActionEvent extends BaseEventAction<DragStartActionArgsType> {
    public getName(): string {
        return "DragStartActionEvent";
    }
}
export class DragEndActionEvent extends BaseEventAction<DragEndActionArgsType> {
    public getName(): string {
        return "DragEndActionEvent";
    }
}
