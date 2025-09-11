import { useMemo } from "react";
import { createConfigurableComponent } from "@webiny/react-properties";
import type { ActionsConfig } from "./Actions/index.js";
import { Actions } from "./Actions/index.js";
import { FieldElement } from "./FieldElement.js";
import { Width } from "./Width.js";
import { ValidationIndicatorsConfig } from "~/admin/config/contentEntries/editor/ValidationIndicators.js";

const base = createConfigurableComponent<ContentEntryEditorConfig>("ContentEntryEditorConfig");

export const ContentEntryEditorConfig = Object.assign(base.Config, {
    Actions,
    FieldElement,
    Width,
    ValidationIndicators: ValidationIndicatorsConfig
});

export const ContentEntryEditorWithConfig = base.WithConfig;

interface ContentEntryEditorConfig {
    actions: ActionsConfig;
    width: string;
}

export function useContentEntryEditorConfig() {
    const config = base.useConfig();

    const actions = config.actions || [];

    return useMemo(
        () => ({
            buttonActions: [...(actions.filter(action => action.$type === "button-action") || [])],
            menuItemActions: [
                ...(actions.filter(action => action.$type === "menu-item-action") || [])
            ],
            width: config.width || "1020px"
        }),
        [config]
    );
}
