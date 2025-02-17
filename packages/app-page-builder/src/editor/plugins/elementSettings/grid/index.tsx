import React from "react";
import { GridSize } from "./GridSize.js";
import { GridSettings } from "./GridSettings.js";
import { PbEditorPageElementStyleSettingsPlugin } from "../../../../types.js";

export default [
    {
        name: "pb-editor-page-element-style-settings-grid",
        type: "pb-editor-page-element-style-settings",
        render() {
            return <GridSize />;
        }
    } as PbEditorPageElementStyleSettingsPlugin,
    {
        name: "pb-editor-page-element-style-settings-grid-settings",
        type: "pb-editor-page-element-style-settings",
        render() {
            return <GridSettings />;
        }
    } as PbEditorPageElementStyleSettingsPlugin
];
