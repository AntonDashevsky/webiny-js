import React from "react";
import { PageEditorConfig } from "~/modules/pages/PageEditor/PageEditorConfig.js";
import { AutoSaveIndicator, PageAutoSave } from "~/modules/pages/PageEditor/PageAutoSave.js";
import { BackButton } from "./TopBar/BackButton.js";
import { Title } from "./TopBar/Title.js";
import { PublishButton } from "./TopBar/PublishButton.js";
import { RevisionsMenu } from "~/modules/pages/PageEditor/TopBar/RevisionsMenu.js";
import { SettingsButton } from "./TopBar/SettingsButton.js";

const { Ui } = PageEditorConfig;

export const DefaultPageEditorConfig = () => {
    return (
        <PageEditorConfig>
            <Ui.TopBar.Element name={"buttonBack"} group={"left"} element={<BackButton />} />
            <Ui.TopBar.Element name={"title"} group={"left"} element={<Title />} />
            <Ui.TopBar.Action name={"revisionsMenu"} element={<RevisionsMenu />} />
            <Ui.TopBar.Action name={"buttonSettings"} element={<SettingsButton />} />
            <Ui.TopBar.Action name={"buttonPublish"} element={<PublishButton />} />
            <PageAutoSave />
            <Ui.TopBar.Element
                group={"left"}
                name={"autoSave"}
                after={"title"}
                element={<AutoSaveIndicator />}
            />
        </PageEditorConfig>
    );
};
