import { UpdateElementActionEvent } from "./event.js";
import { updateElementAction } from "./action.js";
import { PbEditorEventActionPlugin } from "~/types.js";

export default (): PbEditorEventActionPlugin => {
    return {
        type: "pb-editor-event-action-plugin",
        name: "pb-editor-event-action-update-element",
        onEditorMount: handler => {
            return handler.on(UpdateElementActionEvent, updateElementAction);
        }
    };
};
