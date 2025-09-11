import React from "react";
import AccordionItemsList from "./AccordionItemsList";
import type { PbEditorPageElementAdvancedSettingsPlugin } from "~/types";

export default {
    name: "pb-editor-page-element-advanced-settings-accordion",
    type: "pb-editor-page-element-advanced-settings",
    elementType: "accordion",
    render() {
        return <AccordionItemsList />;
    }
} as PbEditorPageElementAdvancedSettingsPlugin;
