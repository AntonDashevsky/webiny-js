import React from "react";
import get from "lodash/get.js";
import { i18n } from "@webiny/app/i18n/index.js";
import { CmsModelFieldRendererPlugin } from "~/types.js";
import { Select } from "@webiny/ui/Select/index.js";

const t = i18n.ns("app-headless-cms/admin/fields/text");

const plugin: CmsModelFieldRendererPlugin = {
    type: "cms-editor-field-renderer",
    name: "cms-editor-field-renderer-select-box",
    renderer: {
        rendererName: "select-box",
        name: t`Select Box`,
        description: t`Renders a select box, allowing selection of a single value.`,
        canUse({ field }) {
            return !field.multipleValues && !!get(field, "predefinedValues.enabled");
        },
        render({ field, getBind }) {
            const Bind = getBind();

            const { values: options = [] } = field.predefinedValues || {};
            const defaultOption = options.find(option => !!option.selected);

            return (
                <Bind defaultValue={defaultOption ? defaultOption.value : undefined}>
                    <Select
                        label={field.label}
                        description={field.helpText}
                        options={options}
                        placeholder={field.placeholderText}
                        data-testid={`fr.input.select.${field.label}`}
                    />
                </Bind>
            );
        }
    }
};

export default plugin;
