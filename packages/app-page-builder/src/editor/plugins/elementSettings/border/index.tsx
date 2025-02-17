import React from "react";
import { PbEditorPageElementStyleSettingsPlugin } from "../../../../types.js";
import BorderSettings from "./BorderSettings.js";

export default {
    name: "pb-editor-page-element-style-settings-border",
    type: "pb-editor-page-element-style-settings",
    render() {
        return <BorderSettings />;
    }
} as PbEditorPageElementStyleSettingsPlugin;
