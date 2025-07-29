import { BaseEventAction } from "~/editor/recoil/eventActions";
import type { SaveTemplateActionArgsType } from "./types";

export class SaveTemplateActionEvent extends BaseEventAction<SaveTemplateActionArgsType> {
    public getName(): string {
        return "SaveTemplateActionEvent";
    }
}
