import React from "react";
import get from "lodash/get.js";
import type { CmsModelFieldRendererPlugin } from "~/types.js";
import { i18n } from "@webiny/app/i18n/index.js";
import { RadioGroup } from "@webiny/admin-ui";

const t = i18n.ns("app-headless-cms/admin/fields/text");

const plugin: CmsModelFieldRendererPlugin = {
    type: "cms-editor-field-renderer",
    name: "cms-editor-field-renderer-radio-buttons",
    renderer: {
        rendererName: "radio-buttons",
        name: t`Radio Buttons`,
        description: t`Renders radio buttons, allowing selection of a single value.`,
        canUse({ field }) {
            return !field.multipleValues && !!get(field, "predefinedValues.enabled");
        },
        render({ field, getBind }) {
            const Bind = getBind();

            const { values: options = [] } = field.predefinedValues || {
                options: []
            };

            const defaultOption = options.find(opt => opt.selected === true);

            return (
                <Bind defaultValue={defaultOption ? defaultOption.value : undefined}>
                    {({ onChange, value, ...bind }) => (
                        <Bind.ValidationContainer>
                            <RadioGroup
                                {...bind}
                                label={field.label}
                                description={field.helpText}
                                items={options.map(option => ({
                                    label: option.label,
                                    value: String(option.value),
                                    selected: option.selected
                                }))}
                                value={String(value)}
                                onChange={value => {
                                    if (field.type === "number") {
                                        onChange(Number(value));
                                    } else {
                                        onChange(String(value));
                                    }
                                }}
                            />
                        </Bind.ValidationContainer>
                    )}
                </Bind>
            );
        }
    }
};

export default plugin;
