import { BaseEventAction } from "../../eventActions";
import type { CreateElementEventActionArgsType } from "./types";

export class CreateElementActionEvent extends BaseEventAction<CreateElementEventActionArgsType> {
    public getName(): string {
        return "CreateElementActionEvent";
    }
}
