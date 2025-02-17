import React from "react";
import { EventActionHandlerDecorator, EventActionHandlers } from "./eventActions/index.js";
import { AddBlock } from "~/templateEditor/config/Content/BlocksBrowser/AddBlock.js";
import { AddContent } from "~/templateEditor/config/Content/BlocksBrowser/AddContent.js";
import { BackButton } from "./TopBar/BackButton/BackButton.js";
import { BlocksBrowser } from "~/templateEditor/config/Content/BlocksBrowser/BlocksBrowser.js";
import { EditBlockAction } from "~/templateEditor/config/Sidebar/EditBlockAction.js";
import { RefreshBlockAction } from "~/templateEditor/config/Sidebar/RefreshBlockAction.js";
import { UnlinkBlock } from "./Sidebar/UnlinkBlock.js";
import { Title } from "./TopBar/Title/Title.js";
import { PublishPageButton } from "./TopBar/PublishPageButton/PublishPageButton.js";
import { PageSettingsButton } from "./TopBar/PageSettings/PageSettingsButton.js";
import { PageSettingsOverlay } from "./TopBar/PageSettings/PageSettings.js";
import { RevisionsDropdownMenu } from "./TopBar/Revisions/Revisions.js";
import { HideSaveAction } from "~/templateEditor/config/Sidebar/HideSaveAction.js";
import { VariableSettings } from "./Sidebar/VariableSettings.js";
import { TemplateMode } from "./Sidebar/TemplateMode.js";
import { UnlinkTemplate } from "./Toolbar/UnlinkTemplate.js";
import { PreviewPageOption } from "./TopBar/PreviewPageOption/PreviewPageOption.js";
import { SetAsHomepageOption } from "./TopBar/SetAsHomepageOption/SetAsHomepageOption.js";
import { EditorConfig } from "~/editor/config/index.js";
import { InjectElementVariables } from "~/render/variables/InjectElementVariables.js";
import { SetupDynamicDocument } from "~/pageEditor/config/SetupDynamicDocument.js";

const { ElementAction, Ui } = EditorConfig;

export const DefaultPageEditorConfig = React.memo(() => {
    return (
        <>
            <EventActionHandlerDecorator />
            <EditorConfig>
                <SetupDynamicDocument />
                <EventActionHandlers />
                <Ui.TopBar.Element name={"buttonBack"} group={"left"} element={<BackButton />} />
                <Ui.TopBar.Element name={"title"} group={"left"} element={<Title />} />
                <Ui.TopBar.Action
                    name={"dropdownMenuRevisions"}
                    element={<RevisionsDropdownMenu />}
                    before={"dropdownActions"}
                />
                <Ui.TopBar.Action
                    name={"divider"}
                    element={<Ui.TopBar.Divider />}
                    before={"dropdownActions"}
                />
                <Ui.TopBar.Action
                    name={"buttonPublishPage"}
                    element={<PublishPageButton />}
                    after={"dropdownActions"}
                />
                <Ui.TopBar.Action
                    name={"buttonPageSettings"}
                    element={<PageSettingsButton />}
                    before={"dropdownActions"}
                />
                <Ui.TopBar.DropdownAction name={"previewPage"} element={<PreviewPageOption />} />
                <Ui.TopBar.DropdownAction
                    name={"setAsHomepage"}
                    element={<SetAsHomepageOption />}
                />
                <Ui.Element
                    group={"overlays"}
                    name={"pageSettings"}
                    element={<PageSettingsOverlay />}
                />
                <Ui.Content.Element name={"addBlock"} element={<AddBlock />} />
                <Ui.Content.Element name={"addContent"} element={<AddContent />} />
                <Ui.Element group={"overlays"} name={"blocksBrowser"} element={<BlocksBrowser />} />
                <ElementAction name={"editBlock"} element={<EditBlockAction />} />
                <ElementAction name={"refreshBlock"} element={<RefreshBlockAction />} />
                <Ui.Sidebar.Element
                    name={"variableSettings"}
                    group={"element"}
                    element={<VariableSettings />}
                    after={"elementActions"}
                />
                <UnlinkBlock />
                <HideSaveAction />
                <TemplateMode />
                <UnlinkTemplate />
                <InjectElementVariables />
            </EditorConfig>
        </>
    );
});

DefaultPageEditorConfig.displayName = "DefaultPageEditorConfig";
