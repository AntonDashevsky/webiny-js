import { BaseEventAction } from "../../eventActions/index.js";
import { CreateElementEventActionArgsType } from "./types.js";

export class CreateElementActionEvent extends BaseEventAction<CreateElementEventActionArgsType> {
    public getName(): string {
        return "CreateElementActionEvent";
    }
}
