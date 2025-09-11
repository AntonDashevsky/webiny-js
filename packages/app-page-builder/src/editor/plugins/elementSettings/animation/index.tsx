import React from "react";
import type { PbEditorPageElementStyleSettingsPlugin } from "../../../../types";
import AnimationSettings from "./AnimationSettings";

export default {
    name: "pb-editor-page-element-style-settings-animation",
    type: "pb-editor-page-element-style-settings",
    render() {
        return <AnimationSettings />;
    }
} as PbEditorPageElementStyleSettingsPlugin;
