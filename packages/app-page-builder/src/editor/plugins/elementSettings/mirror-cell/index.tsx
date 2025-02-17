import React from "react";
import { ReactComponent as MirrorIcon } from "~/editor/assets/icons/mirror_cell.svg";
import MirrorCellAction from "./MirrorCellAction.js";
import Action from "../components/Action.js";
import { PbEditorPageElementSettingsPlugin } from "~/types.js";

export default {
    name: "pb-editor-page-element-settings-mirror-cell",
    type: "pb-editor-page-element-settings",
    renderAction() {
        return (
            <MirrorCellAction>
                <Action tooltip={"Mirror cell"} icon={<MirrorIcon />} />
            </MirrorCellAction>
        );
    }
} as PbEditorPageElementSettingsPlugin;
