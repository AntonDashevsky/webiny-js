import React from "react";
import { merge } from "dot-prop-immutable";
import { renderPlugins } from "@webiny/app/plugins/index.js";
import { plugins } from "@webiny/plugins";
import { Form, type FormOnSubmit, type FormRenderPropParams } from "@webiny/form";
import { type PbEditorElement, type PbEditorPageElementAdvancedSettingsPlugin } from "~/types.js";
import { useUpdateElement } from "~/editor/hooks/useUpdateElement.js";
import { useActiveElement } from "~/editor/hooks/useActiveElement.js";
import { ElementProperties, ElementProperty } from "~/editor/config/ElementProperty.js";

export const ElementSettings = () => {
    const [element] = useActiveElement();
    const updateElement = useUpdateElement();

    const onSubmit: FormOnSubmit = async formData => {
        const settingsPlugins = plugins
            .byType<PbEditorPageElementAdvancedSettingsPlugin>(
                "pb-editor-page-element-advanced-settings"
            )
            .filter(pl => pl.elementType === element?.type);

        let modifiedFormData = formData;
        for (const plugin of settingsPlugins) {
            if (typeof plugin?.onSave === "function") {
                modifiedFormData = await plugin.onSave(modifiedFormData);
            }
        }

        updateElement(merge(element, "data", modifiedFormData));
    };

    if (!element) {
        return null;
    }

    return (
        <Form key={element && element.id} data={element.data} onSubmit={onSubmit}>
            {formProps => (
                <>
                    <LegacyPlugins element={element} formProps={formProps} />
                    <ElementProperties group={ElementProperty.ELEMENT} />
                </>
            )}
        </Form>
    );
};

interface LegacyPluginsProps {
    element: PbEditorElement;
    formProps: FormRenderPropParams;
}

const LegacyPlugins = ({ element, formProps }: LegacyPluginsProps) => {
    return (
        <>
            {renderPlugins<PbEditorPageElementAdvancedSettingsPlugin>(
                "pb-editor-page-element-advanced-settings",
                formProps,
                {
                    wrapper: false,
                    filter: pl => pl.elementType === element.type || pl.elementType === "all"
                }
            )}
        </>
    );
};
