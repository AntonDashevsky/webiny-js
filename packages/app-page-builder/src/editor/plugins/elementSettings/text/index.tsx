import React from "react";
import { type PbEditorPageElementStyleSettingsPlugin } from "../../../../types.js";
import TextSettings from "./TextSettings.js";

export default {
    name: "pb-editor-page-element-style-settings-text",
    type: "pb-editor-page-element-style-settings",
    render({ options }) {
        return <TextSettings options={options} />;
    }
} as PbEditorPageElementStyleSettingsPlugin;
