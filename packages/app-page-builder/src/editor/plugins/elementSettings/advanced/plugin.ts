import { type PbEditorEventActionPlugin } from "~/types.js";
import { elementSettingsAction } from "./elementSettingsAction.js";
import { CreateElementActionEvent } from "~/editor/recoil/actions/index.js";

export default {
    name: "pb-editor-event-action-advanced-settings",
    type: "pb-editor-event-action-plugin",
    onEditorMount(handler) {
        return handler.on(CreateElementActionEvent, elementSettingsAction);
    }
} as PbEditorEventActionPlugin;
