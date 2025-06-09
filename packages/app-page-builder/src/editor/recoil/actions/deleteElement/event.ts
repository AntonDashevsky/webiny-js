import { type DeleteElementActionArgsType } from "./types.js";
import { BaseEventAction } from "../../eventActions/index.js";

export class DeleteElementActionEvent extends BaseEventAction<DeleteElementActionArgsType> {
    public getName(): string {
        return "DeleteElementActionEvent";
    }
}
