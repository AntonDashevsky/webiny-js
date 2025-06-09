import React from "react";
import { type PbEditorPageElementStyleSettingsPlugin } from "../../../../types.js";
import WidthSettings from "./WidthSettings.js";

export default {
    name: "pb-editor-page-element-style-settings-width",
    type: "pb-editor-page-element-style-settings",
    render() {
        return <WidthSettings />;
    }
} as PbEditorPageElementStyleSettingsPlugin;
