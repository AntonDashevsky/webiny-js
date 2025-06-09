import React from "react";
import { type PbEditorPageElementStyleSettingsPlugin } from "../../../../types.js";
import HorizontalAlignSettings from "./HorizontalAlignSettings.js";
import HorizontalAlignFlexSettings from "./HorizontalAlignFlexSettings.js";
import VerticalAlignSettings from "./VerticalAlignSettings.js";

export default [
    {
        name: "pb-editor-page-element-style-settings-horizontal-align",
        type: "pb-editor-page-element-style-settings",
        render({ options }) {
            return <HorizontalAlignSettings options={options} />;
        }
    } as PbEditorPageElementStyleSettingsPlugin,
    {
        name: "pb-editor-page-element-style-settings-horizontal-align-flex",
        type: "pb-editor-page-element-style-settings",
        render() {
            return <HorizontalAlignFlexSettings />;
        }
    } as PbEditorPageElementStyleSettingsPlugin,
    {
        name: "pb-editor-page-element-style-settings-vertical-align",
        type: "pb-editor-page-element-style-settings",
        render() {
            return <VerticalAlignSettings />;
        }
    } as PbEditorPageElementStyleSettingsPlugin
];
