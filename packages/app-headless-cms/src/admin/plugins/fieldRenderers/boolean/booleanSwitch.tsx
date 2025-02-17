import React from "react";
import get from "lodash/get.js";
import { CmsModelFieldRendererPlugin } from "~/types.js";
import { Switch } from "@webiny/ui/Switch/index.js";
import { i18n } from "@webiny/app/i18n/index.js";

const t = i18n.ns("app-headless-cms/admin/fields/boolean");

const plugin: CmsModelFieldRendererPlugin = {
    type: "cms-editor-field-renderer",
    name: "cms-editor-field-renderer-boolean",
    renderer: {
        rendererName: "boolean-input",
        name: t`Boolean Input`,
        description: t`Renders a simple switch button.`,
        canUse({ field }) {
            return (
                field.type === "boolean" &&
                !field.multipleValues &&
                !get(field, "predefinedValues.enabled")
            );
        },
        render({ field, getBind }) {
            const Bind = getBind();

            return (
                <Bind>
                    {bindProps => (
                        <Switch
                            {...bindProps}
                            label={field.label}
                            description={field.helpText}
                            data-testid={`fr.input.boolean.${field.label}`}
                        />
                    )}
                </Bind>
            );
        }
    }
};

export default plugin;
