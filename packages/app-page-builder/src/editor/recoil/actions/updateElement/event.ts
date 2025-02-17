import { UpdateElementActionArgsType } from "./types.js";
import { BaseEventAction } from "../../eventActions/index.js";

export class UpdateElementActionEvent extends BaseEventAction<UpdateElementActionArgsType> {
    public getName(): string {
        return "UpdateElementActionEvent";
    }
}
