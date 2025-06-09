import React from "react";
import { type PbEditorPageElementStyleSettingsPlugin } from "../../../../types.js";
import HrefSettings from "./HrefSettings.js";

export default {
    name: "pb-editor-page-element-style-settings-link",
    type: "pb-editor-page-element-style-settings",
    render() {
        return <HrefSettings />;
    }
} as PbEditorPageElementStyleSettingsPlugin;
