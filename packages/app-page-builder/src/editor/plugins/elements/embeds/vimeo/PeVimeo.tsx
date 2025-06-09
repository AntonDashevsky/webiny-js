import React from "react";

import { createRenderer, useRenderer } from "@webiny/app-page-builder-elements";
import PeOEmbed from "~/editor/components/PeOEmbed.js";
import { type EmbedPluginConfig } from "~/editor/plugins/elements/utils/oembed/createEmbedPlugin.js";
import VimeoEmbed from "./VimeoEmbed.js";

interface Props {
    embedPluginConfig: EmbedPluginConfig;
}

export const PeVimeo = createRenderer<Props>(({ embedPluginConfig }) => {
    const { getElement } = useRenderer();
    const element = getElement();

    return (
        <PeOEmbed
            element={element}
            {...embedPluginConfig.oembed}
            renderEmbed={props => <VimeoEmbed {...props} />}
        />
    );
});
