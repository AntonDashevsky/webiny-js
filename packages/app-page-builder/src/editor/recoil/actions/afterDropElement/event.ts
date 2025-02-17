import { BaseEventAction } from "../../eventActions/index.js";
import { AfterDropElementActionArgsType } from "./types.js";

export class AfterDropElementActionEvent extends BaseEventAction<AfterDropElementActionArgsType> {
    public getName(): string {
        return "AfterDropElementActionEvent";
    }
}
