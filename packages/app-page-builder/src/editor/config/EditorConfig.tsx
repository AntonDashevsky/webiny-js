import { createConfigurableComponent } from "@webiny/react-properties";
import { Element, ElementConfig } from "./Element.js";
import { TopBar } from "./TopBar/TopBar.js";
import { Layout } from "./Layout.js";
import { Content } from "./Content/Content.js";
import { Toolbar } from "./Toolbar/Toolbar.js";
import { Sidebar } from "./Sidebar/Sidebar.js";
import { Elements } from "~/editor/config/Elements.js";
import { OnActiveElement } from "./OnActiveElement.js";
import { NoActiveElement } from "./NoActiveElement.js";
import { ElementProperties, ElementProperty } from "./ElementProperty.js";
import { ElementAction, ElementActions } from "./ElementAction.js";

const base = createConfigurableComponent<ContentEntryEditorConfig>("PageBuilderEditorConfig");

export const EditorConfig = Object.assign(base.Config, {
    /**
     * Components to configure editor UI.
     */
    Ui: {
        Element,
        Elements,
        Layout,
        Content,
        TopBar,
        Toolbar,
        Sidebar,
        OnActiveElement,
        NoActiveElement
    },
    /**
     * Define a new element property.
     */
    ElementProperty,
    /**
     * Render element properties for the given group.
     */
    ElementProperties,
    /**
     * Define an element action.
     */
    ElementAction,
    /**
     * Render all element actions.
     */
    ElementActions,
    /**
     * Access full editor config. WARNING: very low-level, we don't recommend using this directly!
     */
    useEditorConfig
});

export const EditorWithConfig = Object.assign(base.WithConfig, { displayName: "EditorWithConfig" });

interface ContentEntryEditorConfig {
    elements: ElementConfig[];
}

export function useEditorConfig() {
    const config = base.useConfig();

    return { elements: config.elements || [] };
}
