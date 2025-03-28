import React from "react";
import { i18n } from "@webiny/app/i18n/index.js";
import { Accordion as RootAccordion, AccordionItem } from "@webiny/ui/Accordion/index.js";
import { CmsModelFieldRendererPlugin, CmsModelFieldRendererProps } from "~/types.js";
import { FieldSettings } from "./FieldSettings.js";
import { AccordionRenderSettings, getAccordionRenderSettings } from "../AccordionRenderSettings.js";
import { MultiValueContainer } from "~/admin/plugins/fieldRenderers/object/MultiValueContainer.js";
import { MultiValueRendererSettings } from "~/admin/plugins/fieldRenderers/MultiValueRendererSettings.js";

const t = i18n.ns("app-headless-cms/admin/fields/text");

const ObjectsRenderer = (props: CmsModelFieldRendererProps) => {
    const { field, getBind } = props;

    const fieldSettings = FieldSettings.createFrom(field);

    if (!fieldSettings.hasFields()) {
        fieldSettings.logMissingFields();
        return null;
    }

    const { open } = getAccordionRenderSettings(field);

    const Bind = getBind();

    return (
        <Bind>
            {bind => {
                const values = bind.value || [];
                const label = `${field.label} ${values.length ? `(${values.length})` : ""}`;

                return (
                    <Bind.ValidationContainer>
                        <RootAccordion>
                            <AccordionItem title={label} description={field.helpText} open={open}>
                                <MultiValueContainer
                                    bind={bind}
                                    getBind={getBind}
                                    showTitle={false}
                                />
                            </AccordionItem>
                        </RootAccordion>
                    </Bind.ValidationContainer>
                );
            }}
        </Bind>
    );
};

const plugin: CmsModelFieldRendererPlugin = {
    type: "cms-editor-field-renderer",
    name: "cms-editor-field-renderer-objects-accordion",
    renderer: {
        rendererName: "objects-accordion",
        name: t`Accordion`,
        description: t`Renders fields within an accordion.`,
        canUse({ field }) {
            return field.type === "object" && Boolean(field.multipleValues);
        },
        render(props) {
            return <ObjectsRenderer {...props} />;
        },
        renderSettings(props) {
            return (
                <>
                    <MultiValueRendererSettings {...props} />
                    <AccordionRenderSettings {...props} />
                </>
            );
        }
    }
};

export default plugin;
