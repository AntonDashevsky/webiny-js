import React from "react";
import TabsList from "./TabsList.js";
import { PbEditorPageElementAdvancedSettingsPlugin } from "~/types.js";

export default {
    name: "pb-editor-page-element-advanced-settings-tabs",
    type: "pb-editor-page-element-advanced-settings",
    elementType: "tabs",
    render() {
        return <TabsList />;
    }
} as PbEditorPageElementAdvancedSettingsPlugin;
