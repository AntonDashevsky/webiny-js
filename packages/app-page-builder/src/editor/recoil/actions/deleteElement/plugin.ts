import { DeleteElementActionEvent } from "./event.js";
import { deleteElementAction } from "./action.js";
import { PbEditorEventActionPlugin } from "~/types.js";

export default (): PbEditorEventActionPlugin => ({
    type: "pb-editor-event-action-plugin",
    name: "pb-editor-event-action-delete-element",
    onEditorMount: handler => {
        return handler.on(DeleteElementActionEvent, deleteElementAction);
    }
});
