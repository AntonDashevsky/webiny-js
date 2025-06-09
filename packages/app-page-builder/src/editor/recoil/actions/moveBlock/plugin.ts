import { MoveBlockActionEvent } from "./event.js";
import { moveBlockAction } from "./action.js";
import { type PbEditorEventActionPlugin } from "~/types.js";

export default (): PbEditorEventActionPlugin => {
    return {
        type: "pb-editor-event-action-plugin",
        name: "pb-editor-event-action-move-block",
        onEditorMount: handler => {
            return handler.on(MoveBlockActionEvent, moveBlockAction);
        }
    };
};
