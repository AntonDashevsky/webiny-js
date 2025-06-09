import React from "react";
import AccordionItemSettings from "./AccordionItemSettings.js";
import { type PbEditorPageElementStyleSettingsPlugin } from "~/types.js";

export default {
    name: "pb-editor-page-element-style-settings-accordion-item",
    type: "pb-editor-page-element-style-settings",
    render() {
        return <AccordionItemSettings />;
    }
} as PbEditorPageElementStyleSettingsPlugin;
