import { BaseEventAction } from "~/editor/recoil/eventActions/index.js";
import { type SaveTemplateActionArgsType } from "./types.js";

export class SaveTemplateActionEvent extends BaseEventAction<SaveTemplateActionArgsType> {
    public getName(): string {
        return "SaveTemplateActionEvent";
    }
}
