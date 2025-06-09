import React from "react";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/delete.svg";
import DeleteAction from "./DeleteAction.js";
import Action from "../components/Action.js";
import { type PbEditorPageElementSettingsPlugin } from "~/types.js";

export default {
    name: "pb-editor-page-element-settings-delete",
    type: "pb-editor-page-element-settings",
    renderAction() {
        return (
            <DeleteAction>
                <Action
                    tooltip={"Delete selected"}
                    shortcut={["Backspace", "Delete"]}
                    icon={<DeleteIcon />}
                />
            </DeleteAction>
        );
    }
} as PbEditorPageElementSettingsPlugin;
