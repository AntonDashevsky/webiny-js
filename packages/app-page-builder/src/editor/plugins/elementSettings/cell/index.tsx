import React from "react";
import { type PbEditorPageElementStyleSettingsPlugin } from "../../../../types.js";
import VerticalAlignSettings from "./VerticalAlignSettings.js";

export default {
    name: "pb-editor-page-element-style-settings-cell-vertical-align",
    type: "pb-editor-page-element-style-settings",
    render() {
        return <VerticalAlignSettings />;
    }
} as PbEditorPageElementStyleSettingsPlugin;
