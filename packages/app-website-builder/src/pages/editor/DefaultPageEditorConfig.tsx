import React from "react";
import { PageEditorConfig } from "~/pages/editor/PageEditorConfig";
import { AutoSaveIndicator, PageAutoSave } from "~/pages/editor/PageAutoSave";
import { BackButton } from "./TopBar/BackButton";
import { Title } from "./TopBar/Title";
import { PageOptionsDropdown } from "./TopBar/DropdownActions/PageOptionsDropdown";

const { Ui } = PageEditorConfig;

export const DefaultPageEditorConfig = () => {
    return (
        <PageEditorConfig>
            <PageAutoSave />
            <Ui.TopBar.Element
                group={"left"}
                name={"autoSave"}
                after={"title"}
                element={<AutoSaveIndicator />}
            />
            <Ui.TopBar.Element name={"buttonBack"} group={"left"} element={<BackButton />} />
            <Ui.TopBar.Element name={"title"} group={"left"} element={<Title />} />
            <Ui.TopBar.Action name={"dropdownActions"} element={<PageOptionsDropdown />} />
        </PageEditorConfig>
    );
};
