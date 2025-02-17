import React from "react";
import { BackButton } from "~/blockEditor/config/TopBar/BackButton/index.js";
import { Title } from "~/blockEditor/config/TopBar/Title/index.js";
import { SaveBlockButton } from "~/blockEditor/config/TopBar/SaveBlockButton/index.js";
import { BlockSettingsButton } from "~/blockEditor/config/TopBar/BlockSettings/BlockSettingsButton.js";
import { ElementSettingsDecorator } from "~/blockEditor/config/ElementSettingsTab.js";
import { EventActionHandlers, EventActionHandlerDecorator } from "./eventActions/index.js";
import { EditorConfig, DefaultEditorConfig } from "~/editor/index.js";

const { Ui } = EditorConfig;

export const DefaultBlockEditorConfig = () => {
    return (
        <>
            <DefaultEditorConfig />
            <EventActionHandlerDecorator />
            <EditorConfig>
                <EventActionHandlers />
                <Ui.TopBar.Element name={"buttonBack"} group={"left"} element={<BackButton />} />
                <Ui.TopBar.Element name={"title"} group={"left"} element={<Title />} />
                <Ui.TopBar.Action name={"buttonSaveBlock"} element={<SaveBlockButton />} />
                <Ui.TopBar.Action
                    name={"buttonBlockSettings"}
                    element={<BlockSettingsButton />}
                    before={"buttonSaveBlock"}
                />
                <Ui.Toolbar.Element name={"savingIndicator"} remove />
                <ElementSettingsDecorator />
            </EditorConfig>
        </>
    );
};
