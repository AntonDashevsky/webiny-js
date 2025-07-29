import React from "react";
import get from "lodash/get";
import { i18n } from "@webiny/app/i18n";
import type { CmsModelFieldRendererPlugin } from "~/types";
import { ReactComponent as DeleteIcon } from "@webiny/icons/delete.svg";
import DynamicSection from "../DynamicSection";
import { MultiValueRendererSettings } from "~/admin/plugins/fieldRenderers/MultiValueRendererSettings";
import { DelayedOnChange, Icon, Input } from "@webiny/admin-ui";

const t = i18n.ns("app-headless-cms/admin/fields/text");

const plugin: CmsModelFieldRendererPlugin = {
    type: "cms-editor-field-renderer",
    name: "cms-editor-field-renderer-text-inputs",
    renderer: {
        rendererName: "text-inputs",
        name: t`Text Inputs`,
        description: t`Renders a simple list of text inputs.`,
        canUse({ field }) {
            return (
                field.type === "text" &&
                !!field.multipleValues &&
                !get(field, "predefinedValues.enabled")
            );
        },
        render(props) {
            return (
                <DynamicSection {...props}>
                    {({ bind, index }) => (
                        <DelayedOnChange
                            value={bind.index.value}
                            onChange={bind.index.onChange}
                            onBlur={bind.index.validate}
                        >
                            <Input
                                validation={bind.index.validation}
                                onEnter={() => bind.field.appendValue("")}
                                label={t`Value {number}`({ number: index + 1 })}
                                placeholder={props.field.placeholderText}
                                data-testid={`fr.input.texts.${props.field.label}.${index + 1}`}
                                endIcon={
                                    <Icon
                                        icon={<DeleteIcon />}
                                        label={"Delete"}
                                        onClick={() => bind.field.removeValue(index)}
                                        className={"wby-cursor-pointer"}
                                    />
                                }
                            />
                        </DelayedOnChange>
                    )}
                </DynamicSection>
            );
        },
        renderSettings(props) {
            return <MultiValueRendererSettings {...props} />;
        }
    }
};

export default plugin;
