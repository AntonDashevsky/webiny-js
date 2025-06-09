import React from "react";
import { type CmsModelFieldRendererPlugin } from "@webiny/app-headless-cms-common/types/index.js";
import { useModelField } from "~/admin/components/ModelFieldProvider/index.js";
import { Cell, Grid } from "@webiny/ui/Grid/index.js";

interface RendererOptionsProps {
    plugin: CmsModelFieldRendererPlugin | undefined;
}

export const RendererOptions = ({ plugin }: RendererOptionsProps) => {
    const { field } = useModelField();
    if (!plugin || !plugin.renderer.renderSettings) {
        return null;
    }

    const settings = plugin.renderer.renderSettings({ field });

    if (!settings) {
        return null;
    }

    return (
        <Grid>
            <Cell span={12}>Renderer Settings:</Cell>
            {settings}
        </Grid>
    );
};
