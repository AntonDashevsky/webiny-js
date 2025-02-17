import { DropElementActionEvent } from "./event.js";
import { dropElementAction } from "./action.js";
import { PbEditorEventActionPlugin } from "~/types.js";

export default (): PbEditorEventActionPlugin => {
    return {
        type: "pb-editor-event-action-plugin",
        name: "pb-editor-event-action-drop-element",
        onEditorMount: handler => {
            return handler.on(DropElementActionEvent, dropElementAction);
        }
    };
};
