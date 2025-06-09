import React from "react";
import AccordionItemsList from "./AccordionItemsList.js";
import { type PbEditorPageElementAdvancedSettingsPlugin } from "~/types.js";

export default {
    name: "pb-editor-page-element-advanced-settings-accordion",
    type: "pb-editor-page-element-advanced-settings",
    elementType: "accordion",
    render() {
        return <AccordionItemsList />;
    }
} as PbEditorPageElementAdvancedSettingsPlugin;
