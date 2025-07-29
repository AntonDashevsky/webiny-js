import { BaseEventAction } from "~/editor/recoil/eventActions";
import type { MirrorCellActionArgsType } from "./types";

export class MirrorCellActionEvent extends BaseEventAction<MirrorCellActionArgsType> {
    public getName(): string {
        return "MirrorCellActionEvent";
    }
}
