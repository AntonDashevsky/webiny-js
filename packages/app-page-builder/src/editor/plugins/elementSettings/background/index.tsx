import React from "react";
import { PbEditorPageElementStyleSettingsPlugin } from "../../../../types.js";
import BackgroundSettings from "./BackgroundSettings.js";

export default {
    name: "pb-editor-page-element-style-settings-background",
    type: "pb-editor-page-element-style-settings",

    render({ options }) {
        return <BackgroundSettings options={options} />;
    }
} as PbEditorPageElementStyleSettingsPlugin;
