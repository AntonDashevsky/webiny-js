import { DropElementActionArgsType } from "./types.js";
import { BaseEventAction } from "../../eventActions/index.js";

export class DropElementActionEvent extends BaseEventAction<DropElementActionArgsType> {
    public getName(): string {
        return "DropElementActionEvent";
    }
}
