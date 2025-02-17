import React from "react";
import { PbEditorPageElementStyleSettingsPlugin } from "../../../../types.js";
import AnimationSettings from "./AnimationSettings.js";

export default {
    name: "pb-editor-page-element-style-settings-animation",
    type: "pb-editor-page-element-style-settings",
    render() {
        return <AnimationSettings />;
    }
} as PbEditorPageElementStyleSettingsPlugin;
