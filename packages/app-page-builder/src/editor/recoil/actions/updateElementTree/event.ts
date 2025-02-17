import { BaseEventAction } from "../../eventActions/index.js";

export class UpdateElementTreeActionEvent extends BaseEventAction {
    public getName(): string {
        return "UpdateElementTreeActionEvent";
    }
}
