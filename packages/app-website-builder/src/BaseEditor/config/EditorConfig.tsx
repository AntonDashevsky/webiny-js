import { createConfigurableComponent } from "@webiny/react-properties";
import type { ElementConfig } from "./Element";
import { Element } from "./Element";
import { TopBar } from "./TopBar/TopBar";
import { Layout } from "./Layout";
import { Content } from "./Content/Content";
import { Toolbar } from "./Toolbar/Toolbar";
import { Sidebar } from "./Sidebar/Sidebar";
import { Elements } from "./Elements";
import { OnActiveElement } from "./OnActiveElement";
import { NoActiveElement } from "./NoActiveElement";
import { ElementProperties, ElementProperty } from "./ElementProperty";
import { ElementAction, ElementActions } from "./ElementAction";
import type { ElementInputConfig } from "./ElementInput";
import { ElementInput } from "./ElementInput";

interface EditorConfig {
    elements: ElementConfig[];
    inputRenderers: ElementInputConfig[];
}

const base = createConfigurableComponent<EditorConfig>("DocumentEditorConfig");

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
    ElementInput,
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

export function useEditorConfig() {
    const config = base.useConfig();

    return { elements: config.elements || [], inputRenderers: config.inputRenderers || [] };
}
