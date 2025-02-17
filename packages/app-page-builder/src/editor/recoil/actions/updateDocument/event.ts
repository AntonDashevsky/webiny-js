import { UpdateDocumentActionArgsType } from "./types.js";
import { BaseEventAction } from "~/editor/recoil/eventActions/index.js";

export class UpdateDocumentActionEvent extends BaseEventAction<UpdateDocumentActionArgsType> {
    public getName(): string {
        return "UpdateDocumentActionEvent";
    }
}
