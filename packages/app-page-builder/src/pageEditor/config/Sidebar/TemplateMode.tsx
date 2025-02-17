import React from "react";
import { VariableSettings } from "~/editor/plugins/elementSettings/variable/VariableSettings.js";
import { useTemplateMode } from "~/pageEditor/hooks/useTemplateMode.js";
import { PageEditorConfig } from "~/pageEditor/editorConfig/PageEditorConfig.js";
import { ScrollableContainer } from "~/editor/config/Sidebar/ScrollableContainer.js";

export const TemplateMode = PageEditorConfig.Ui.Sidebar.Elements.createDecorator(Original => {
    return function TemplateMode(props) {
        const [isTemplateMode] = useTemplateMode();

        if (props.group === "groups" && isTemplateMode) {
            return (
                <ScrollableContainer>
                    <VariableSettings />
                </ScrollableContainer>
            );
        }

        return <Original {...props} />;
    };
});
