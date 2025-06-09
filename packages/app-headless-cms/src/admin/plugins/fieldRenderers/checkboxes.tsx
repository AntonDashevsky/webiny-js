import React from "react";
import get from "lodash/get.js";
import { type CmsModelField, type CmsModelFieldRendererPlugin } from "~/types.js";
import { i18n } from "@webiny/app/i18n/index.js";
import { Checkbox, CheckboxGroup } from "@webiny/ui/Checkbox/index.js";

const t = i18n.ns("app-headless-cms/admin/fields/text");

const adaptToField = (field: CmsModelField, value: string) => {
    return field.type === "number" ? Number(value) : value;
};

const plugin: CmsModelFieldRendererPlugin = {
    type: "cms-editor-field-renderer",
    name: "cms-editor-field-renderer-checkboxes-buttons",
    renderer: {
        rendererName: "checkboxes",
        name: t`Checkboxes`,
        description: t`Renders checkboxes, allowing selection of multiple values.`,
        canUse({ field }) {
            return !!field.multipleValues && !!get(field, "predefinedValues.enabled");
        },
        render({ field, getBind }) {
            const Bind = getBind();

            const { values: predefinedOptions = [] } = field.predefinedValues || {
                values: []
            };

            // For `number` field, we want to convert the value to actual Number.
            const options = predefinedOptions.map(opt => ({
                ...opt,
                value: adaptToField(field, opt.value)
            }));

            const defaults = options.filter(option => option.selected);
            const defaultValue = defaults.length > 0 ? defaults.map(opt => opt.value) : undefined;

            return (
                <Bind defaultValue={defaultValue}>
                    {bind => (
                        <Bind.ValidationContainer>
                            <CheckboxGroup
                                {...bind}
                                label={field.label}
                                description={field.helpText}
                            >
                                {({ onChange, getValue }) => (
                                    <React.Fragment>
                                        {options.map((option, index) => {
                                            return (
                                                <div key={String(option.value) + index}>
                                                    <Checkbox
                                                        label={option.label}
                                                        value={getValue(option.value)}
                                                        onChange={onChange(option.value)}
                                                        data-testid={`fr.input.${field.label}`}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </React.Fragment>
                                )}
                            </CheckboxGroup>
                        </Bind.ValidationContainer>
                    )}
                </Bind>
            );
        }
    }
};

export default plugin;
