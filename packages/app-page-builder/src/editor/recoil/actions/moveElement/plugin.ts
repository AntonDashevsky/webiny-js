import { MoveElementActionEvent } from "./event.js";
import { moveElementAction } from "./action.js";
import { type PbEditorEventActionPlugin } from "~/types.js";

export default (): PbEditorEventActionPlugin => {
    return {
        type: "pb-editor-event-action-plugin",
        name: "pb-editor-event-action-move-element",
        onEditorMount: handler => {
            return handler.on(MoveElementActionEvent, moveElementAction);
        }
    };
};
