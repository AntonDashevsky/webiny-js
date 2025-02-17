import { DocumentNode } from "graphql";
import { createConfigurableComponent } from "@webiny/react-properties";
import { Group, GroupConfig } from "./Group.js";
import { Element } from "./Element.js";
import { GET_SETTINGS, UPDATE_SETTINGS } from "../graphql.js";
import { createDocumentNodeModifier } from "./DocumentNodeModifier.js";

const base = createConfigurableComponent<WebsiteSettingsConfig>("WebsiteSettingsConfig");

export const WebsiteSettingsWithConfig = Object.assign(base.WithConfig, {
    displayName: "WebsiteSettingsWithConfig"
});

interface WebsiteSettingsConfig {
    groups: GroupConfig[];
    querySelections: DocumentNode[];
}

function useWebsiteSettingsConfig() {
    const config = base.useConfig();
    const querySelections = config.querySelections || [];
    const documentModifier = createDocumentNodeModifier();

    return {
        groups: config.groups || [],
        GET_SETTINGS: documentModifier.augmentDocument(
            GET_SETTINGS,
            "pageBuilder.getSettings.data",
            querySelections
        ),
        UPDATE_SETTINGS: documentModifier.augmentDocument(
            UPDATE_SETTINGS,
            "pageBuilder.updateSettings.data",
            querySelections
        )
    };
}

export const WebsiteSettingsConfig = Object.assign(base.Config, {
    Group,
    Element,
    useWebsiteSettingsConfig
});
