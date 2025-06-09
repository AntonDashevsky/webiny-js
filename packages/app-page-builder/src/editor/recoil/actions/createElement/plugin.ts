import { CreateElementActionEvent } from "./event.js";
import { createElementAction } from "./action.js";
import { type PbEditorEventActionPlugin } from "~/types.js";

export default (): PbEditorEventActionPlugin => {
    return {
        type: "pb-editor-event-action-plugin",
        name: "pb-editor-event-action-create-element",
        onEditorMount: handler => {
            return handler.on(CreateElementActionEvent, createElementAction);
        }
    };
};
