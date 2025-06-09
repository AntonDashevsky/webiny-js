import React from "react";
import { type PbEditorPageElementStyleSettingsPlugin } from "~/types.js";
import PropertySettings from "./PropertySettings.js";

export default {
    name: "pb-editor-page-element-style-settings-property",
    type: "pb-editor-page-element-style-settings",
    elements: true,
    render({ options }) {
        return <PropertySettings options={options} />;
    }
} as PbEditorPageElementStyleSettingsPlugin;
