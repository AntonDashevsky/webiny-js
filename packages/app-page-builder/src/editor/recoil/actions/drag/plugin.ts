import { DragStartActionEvent, DragEndActionEvent } from "./event.js";
import { dragStartAction, dragEndAction } from "./action.js";
import { type PbEditorEventActionPlugin } from "~/types.js";

export default (): PbEditorEventActionPlugin[] => {
    return [
        {
            type: "pb-editor-event-action-plugin",
            name: "pb-editor-event-action-drag-start",
            onEditorMount: handler => {
                return handler.on(DragStartActionEvent, dragStartAction);
            }
        },
        {
            type: "pb-editor-event-action-plugin",
            name: "pb-editor-event-action-drag-end",
            onEditorMount: handler => {
                return handler.on(DragEndActionEvent, dragEndAction);
            }
        }
    ];
};
