import React from "react";
import { type PbEditorPageElementStyleSettingsPlugin } from "~/types.js";
import ActionSettings from "./ActionSettings.js";
import { linkActionType } from "./actionTypes/link.js";
import { onClickHandlerActionType } from "./actionTypes/onClickHandler.js";
import { scrollToElementActionType } from "./actionTypes/scrollToElement.js";

export default [
    {
        name: "pb-editor-page-element-style-settings-action",
        type: "pb-editor-page-element-style-settings",
        render() {
            return <ActionSettings />;
        }
    } as PbEditorPageElementStyleSettingsPlugin,
    linkActionType,
    onClickHandlerActionType,
    scrollToElementActionType
];
