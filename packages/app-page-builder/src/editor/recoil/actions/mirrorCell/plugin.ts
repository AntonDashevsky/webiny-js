import { MirrorCellActionEvent } from "./event.js";
import { mirrorCellAction } from "./action.js";
import { PbEditorEventActionPlugin } from "~/types.js";

export default (): PbEditorEventActionPlugin => {
    return {
        type: "pb-editor-event-action-plugin",
        name: "pb-editor-event-action-mirror-cell",
        onEditorMount: handler => {
            return handler.on(MirrorCellActionEvent, mirrorCellAction);
        }
    };
};
