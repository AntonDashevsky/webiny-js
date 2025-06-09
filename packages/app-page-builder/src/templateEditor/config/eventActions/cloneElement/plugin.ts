import { CloneElementActionEvent } from "./event.js";
import { cloneElementAction } from "./action.js";
import { type PbEditorEventActionPlugin } from "~/types.js";

export const createCloneElementPlugin = (): PbEditorEventActionPlugin => {
    return {
        type: "pb-editor-event-action-plugin",
        name: "pb-editor-event-action-clone-element",
        onEditorMount: handler => {
            return handler.on(CloneElementActionEvent, cloneElementAction);
        }
    };
};
