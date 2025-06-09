import React from "react";
import { type PbEditorPageElementSettingsPlugin } from "~/types.js";
import { ReactComponent as FavoriteIcon } from "../../../assets/icons/round-favorite-24px.svg";
import Action from "../components/Action.js";
import SaveAction from "./SaveAction.js";

export default {
    name: "pb-editor-page-element-settings-save",
    type: "pb-editor-page-element-settings",
    renderAction() {
        return (
            <SaveAction>
                <Action tooltip={"Save selected"} icon={<FavoriteIcon />} />
            </SaveAction>
        );
    }
} as PbEditorPageElementSettingsPlugin;
