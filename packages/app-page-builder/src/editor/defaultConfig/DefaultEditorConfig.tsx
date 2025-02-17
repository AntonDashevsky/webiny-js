import React from "react";
import { ReactComponent as TouchIcon } from "@material-design-icons/svg/round/touch_app.svg";
import { DisplayModeSelector } from "./TopBar/DisplayModeSelector/index.js";
import { Breadcrumbs } from "./Content/Breadcrumbs/index.js";
import { Background } from "./Content/Background/index.js";
import { Elements } from "./Content/Elements/index.js";
import { ActionPlugins } from "./ActionPlugins.js";
import { EditorConfig } from "~/editor/config/index.js";
import { AddElement } from "./Toolbar/AddElement/index.js";
import { Navigator } from "./Toolbar/Navigator/index.js";
import { Saving } from "./Toolbar/Saving/Saving.js";
import { Redo, Undo } from "./Toolbar/UndoRedo/UndoRedo.js";
import { ElementActions } from "./Sidebar/ElementSettings/ElementActions.js";
import { InfoMessage } from "./Sidebar/InfoMessage.js";
import { ElementSettings } from "./Sidebar/ElementSettings/ElementSettings.js";
import { StyleSettingsAdapter } from "./Sidebar/BackwardsCompatibility/StyleSettingsAdapter.js";
import { StyleSettingsGroup } from "./Sidebar/StyleSettings/StyleSettingsGroup.js";
import { StyleProperties } from "./Sidebar/StyleSettings/StyleProperties.js";
import { ElementSettingsGroup } from "./Sidebar/ElementSettings/ElementSettingsGroup.js";
import { ElementActionsAdapter } from "./Sidebar/BackwardsCompatibility/ElementActionsAdapter.js";
import { PageOptionsDropdown } from "./TopBar/DropdownActions/PageOptionsDropdown.js";
import { SetupDynamicDataInEditor } from "~/dataInjection/index.js";

const { Ui } = EditorConfig;

const ClickToActivate = () => {
    return (
        <Ui.NoActiveElement>
            <InfoMessage
                icon={<TouchIcon />}
                message={"Select an element on the canvas to activate this panel."}
            />
        </Ui.NoActiveElement>
    );
};

export const DefaultEditorConfig = React.memo(() => {
    return (
        <>
            <ActionPlugins />
            <EditorConfig>
                <Ui.TopBar.Element
                    name={"displayModeSelector"}
                    group={"center"}
                    element={<DisplayModeSelector />}
                />
                <Ui.TopBar.Action name={"dropdownActions"} element={<PageOptionsDropdown />} />
                <Ui.Content.Element name={"breadcrumbs"} element={<Breadcrumbs />} />
                <Ui.Content.Element name={"background"} element={<Background />} />
                <Ui.Content.Element name={"elements"} element={<Elements />} />
                <Ui.Toolbar.Element name={"addElement"} group={"top"} element={<AddElement />} />
                <Ui.Toolbar.Element name={"navigator"} group={"top"} element={<Navigator />} />
                <Ui.Toolbar.Element
                    name={"savingIndicator"}
                    group={"bottom"}
                    element={<Saving />}
                />
                <Ui.Toolbar.Element name={"undo"} group={"bottom"} element={<Undo />} />
                <Ui.Toolbar.Element name={"redo"} group={"bottom"} element={<Redo />} />
                {/* Sidebar Groups */}
                <Ui.Sidebar.Group name={"style"} element={<StyleSettingsGroup />} />
                <Ui.Sidebar.Group name={"element"} element={<ElementSettingsGroup />} />
                {/* Style Settings Tab */}
                <Ui.Sidebar.Element
                    name={"styleSettings"}
                    group={"style"}
                    element={
                        <Ui.OnActiveElement>
                            <StyleProperties />
                        </Ui.OnActiveElement>
                    }
                />
                <Ui.Sidebar.Element
                    name={"styleInactive"}
                    group={"style"}
                    element={<ClickToActivate />}
                />
                {/* Element Settings Tab */}
                <Ui.Sidebar.Element
                    name={"elementInactive"}
                    group={"element"}
                    element={<ClickToActivate />}
                />
                {/* This element renders element actions. */}
                <Ui.Sidebar.Element
                    name={"elementActions"}
                    group={"element"}
                    element={
                        <Ui.OnActiveElement>
                            <ElementActions />
                        </Ui.OnActiveElement>
                    }
                />
                {/* This element renders element properties. */}
                <Ui.Sidebar.Element
                    name={"elementSettings"}
                    group={"element"}
                    element={
                        <Ui.OnActiveElement>
                            <ElementSettings />
                        </Ui.OnActiveElement>
                    }
                />
                {/* This will register style settings from plugins using the new API. */}
                <StyleSettingsAdapter />
                {/* This will register actions from plugins using the new API. */}
                <ElementActionsAdapter />
                {/* Dynamic data */}
                <SetupDynamicDataInEditor />
            </EditorConfig>
        </>
    );
});

DefaultEditorConfig.displayName = "DefaultEditorConfig";
