import React from "react";
import get from "lodash/get.js";
import { i18n } from "@webiny/app/i18n/index.js";
import { CmsModelField, CmsModelFieldRendererPlugin } from "~/types.js";
import { ReactComponent as DeleteIcon } from "~/admin/icons/close.svg";
import DynamicSection from "../DynamicSection.js";
import { IconButton } from "@webiny/ui/Button/index.js";
import styled from "@emotion/styled";
import { LexicalCmsEditor } from "~/admin/components/LexicalCmsEditor/LexicalCmsEditor.js";
import { modelHasLegacyRteField } from "~/admin/plugins/fieldRenderers/richText/utils.js";
import { FormElementMessage } from "@webiny/ui/FormElementMessage/index.js";
import { useForm } from "@webiny/form";
import { DelayedOnChange } from "@webiny/ui/DelayedOnChange/index.js";

const t = i18n.ns("app-headless-cms/admin/fields/rich-text");

const getKey = (id: string | undefined, field: CmsModelField, index: number): string => {
    const formId = id || "new";
    return `${formId}.${field.fieldId}.${index}`;
};

const EditorWrapper = styled("div")({
    position: "relative",
    "> button": {
        position: "absolute",
        top: 0,
        right: 5,
        zIndex: 10
    }
});

const plugin: CmsModelFieldRendererPlugin = {
    type: "cms-editor-field-renderer",
    name: "cms-editor-field-renderer-lexical-inputs",
    renderer: {
        rendererName: "lexical-text-inputs",
        name: t`Lexical Text Inputs`,
        description: t`Renders a list of lexical editors.`,
        canUse({ field, model }) {
            const canUse =
                field.type === "rich-text" &&
                !!field.multipleValues &&
                !get(field, "predefinedValues.enabled");

            if (canUse && modelHasLegacyRteField(model)) {
                return false;
            }

            return canUse;
        },
        render(props) {
            const { field } = props;
            const form = useForm();

            return (
                <DynamicSection {...props}>
                    {({ bind, index }) => (
                        <EditorWrapper>
                            <DelayedOnChange {...bind.index}>
                                {({ value, onChange }) => (
                                    <LexicalCmsEditor
                                        value={value}
                                        onChange={onChange}
                                        key={getKey(form.data.id, field, index)}
                                        placeholder={field.placeholderText}
                                    />
                                )}
                            </DelayedOnChange>
                            {field.multipleValues ? null : (
                                <FormElementMessage>{field.helpText}</FormElementMessage>
                            )}
                            <IconButton
                                icon={<DeleteIcon />}
                                onClick={() => bind.field.removeValue(index)}
                            />
                        </EditorWrapper>
                    )}
                </DynamicSection>
            );
        }
    }
};

export default plugin;
