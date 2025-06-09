import { type PbEditorEventActionPlugin } from "~/types.js";
import { AfterDropElementActionEvent } from "./event.js";
import { afterDropElementAction } from "./action.js";

export default (): PbEditorEventActionPlugin => {
    return {
        type: "pb-editor-event-action-plugin",
        name: "pb-editor-event-action-drop-basic-element",
        onEditorMount: handler => {
            return handler.on(AfterDropElementActionEvent, afterDropElementAction);
        }
    };
};
