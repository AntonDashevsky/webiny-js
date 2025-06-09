import React from "react";
import { type PbEditorPageElementStyleSettingsPlugin } from "../../../../types.js";
import HeightSettings from "./HeightSettings.js";

export default {
    name: "pb-editor-page-element-style-settings-height",
    type: "pb-editor-page-element-style-settings",
    render() {
        return <HeightSettings />;
    }
} as PbEditorPageElementStyleSettingsPlugin;
