import { BaseEventAction } from "~/editor/recoil/eventActions/index.js";
import { MirrorCellActionArgsType } from "./types.js";

export class MirrorCellActionEvent extends BaseEventAction<MirrorCellActionArgsType> {
    public getName(): string {
        return "MirrorCellActionEvent";
    }
}
