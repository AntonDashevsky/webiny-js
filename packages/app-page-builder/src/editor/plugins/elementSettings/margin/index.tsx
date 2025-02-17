import React from "react";
import { PbEditorPageElementStyleSettingsPlugin } from "../../../../types.js";
// Components
import MarginSettings from "../components/MarginPaddingSettings.js";

export default {
    name: "pb-editor-page-element-style-settings-margin",
    type: "pb-editor-page-element-style-settings",
    render() {
        return <MarginSettings styleAttribute={"margin"} />;
    }
} as PbEditorPageElementStyleSettingsPlugin;
