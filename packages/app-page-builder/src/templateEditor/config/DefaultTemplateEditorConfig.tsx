import React from "react";
import { EventActionHandlerDecorator, EventActionHandlers } from "./eventActions/index.js";
import { BackButton } from "./TopBar/BackButton/BackButton.js";
import { SaveTemplateButton } from "./TopBar/SaveTemplateButton/SaveTemplateButton.js";
import { TemplateSettingsButton } from "./TopBar/TemplateSettingsButton/TemplateSettingsButton.js";
import { Title } from "./TopBar/Title/Title.js";
import { BlocksBrowser } from "./Content/BlocksBrowser/BlocksBrowser.js";
import { AddBlock } from "./Content/BlocksBrowser/AddBlock.js";
import { AddContent } from "./Content/BlocksBrowser/AddContent.js";
import { UnlinkBlock } from "./Sidebar/UnlinkBlock.js";
import { ElementSettingsGroup } from "./Sidebar/ElementSettingsGroup.js";
import { RefreshBlockAction } from "./Sidebar/RefreshBlockAction.js";
import { EditBlockAction } from "./Sidebar/EditBlockAction.js";
import { HideSaveAction } from "./Sidebar/HideSaveAction.js";
import { EditorConfig } from "~/editor/config/index.js";
import { SetupDynamicDocument } from "./SetupDynamicDocument.js";

const { Ui, ElementAction } = EditorConfig;

export const DefaultTemplateEditorConfig = React.memo(() => {
    return (
        <>
            <EventActionHandlerDecorator />
            <EditorConfig>
                <SetupDynamicDocument />
                <EventActionHandlers />
                <Ui.TopBar.Element name={"buttonBack"} group={"left"} element={<BackButton />} />
                <Ui.TopBar.Element name={"title"} group={"left"} element={<Title />} />
                <Ui.TopBar.Action
                    name={"buttonTemplateSettings"}
                    element={<TemplateSettingsButton />}
                />
                <Ui.TopBar.Action name={"buttonSaveTemplate"} element={<SaveTemplateButton />} />
                <Ui.Toolbar.Element name={"savingIndicator"} remove />
                <Ui.Content.Element name={"addBlock"} element={<AddBlock />} />
                <Ui.Content.Element name={"addContent"} element={<AddContent />} />
                <Ui.Element group={"overlays"} name={"blocksBrowser"} element={<BlocksBrowser />} />
                <Ui.Sidebar.Element
                    name={"blockActions"}
                    group={"element"}
                    element={<ElementSettingsGroup />}
                />
                <ElementAction name={"editBlock"} element={<EditBlockAction />} />
                <ElementAction name={"refreshBlock"} element={<RefreshBlockAction />} />
                <HideSaveAction />
                <UnlinkBlock />
            </EditorConfig>
        </>
    );
});

DefaultTemplateEditorConfig.displayName = "DefaultTemplateEditorConfig";
