import React from "react";
import { Bind } from "@webiny/form";
import { Grid, Switch } from "@webiny/admin-ui";
import type {
    CmsModelField,
    CmsModelFieldRendererSettingsProps
} from "@webiny/app-headless-cms-common/types/index.js";

export interface IAccordionRenderSettings {
    open: boolean;
}

const DEFAULT_ACCORDION_RENDER_SETTINGS: IAccordionRenderSettings = {
    open: false
};

export const getAccordionRenderSettings = (field: CmsModelField) => {
    if (typeof field.renderer === "function") {
        return DEFAULT_ACCORDION_RENDER_SETTINGS;
    }

    return (field.renderer.settings ?? {}) as IAccordionRenderSettings;
};

export const AccordionRenderSettings = ({ field }: CmsModelFieldRendererSettingsProps) => {
    return (
        <Grid.Column span={12}>
            <Bind name={"renderer.settings.open"} defaultValue={false}>
                <Switch
                    label={"Expand Accordion"}
                    description={`Enable if "${field.label}" is to be expanded by default.`}
                />
            </Bind>
        </Grid.Column>
    );
};
