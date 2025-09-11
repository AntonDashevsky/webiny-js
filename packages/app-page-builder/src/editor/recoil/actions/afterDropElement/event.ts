import { BaseEventAction } from "../../eventActions";
import type { AfterDropElementActionArgsType } from "./types";

export class AfterDropElementActionEvent extends BaseEventAction<AfterDropElementActionArgsType> {
    public getName(): string {
        return "AfterDropElementActionEvent";
    }
}
