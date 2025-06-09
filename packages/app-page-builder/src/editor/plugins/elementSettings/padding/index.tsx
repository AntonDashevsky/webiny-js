import React from "react";
import { type PbEditorPageElementStyleSettingsPlugin } from "../../../../types.js";
// Components
import MarginPaddingSettings from "../components/MarginPaddingSettings.js";

export default {
    name: "pb-editor-page-element-style-settings-padding",
    type: "pb-editor-page-element-style-settings",
    render() {
        return <MarginPaddingSettings styleAttribute={"padding"} />;
    }
} as PbEditorPageElementStyleSettingsPlugin;
