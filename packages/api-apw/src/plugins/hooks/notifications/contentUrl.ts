import { type PluginsContainer } from "@webiny/plugins";
import { ApwContentUrlPlugin, type ApwContentUrlPluginCbParams } from "~/ApwContentUrlPlugin.js";

interface Params extends ApwContentUrlPluginCbParams {
    plugins: PluginsContainer;
}

export const createContentUrl = (params: Params): string | null => {
    const { plugins, contentReview } = params;

    const { type: contentType } = contentReview.content;

    const [contentUrlPlugin] = plugins
        .byType<ApwContentUrlPlugin>(ApwContentUrlPlugin.type)
        .filter(plugin => {
            return plugin.canUse(contentType);
        })
        .reverse();
    if (!contentUrlPlugin) {
        return null;
    }

    return contentUrlPlugin.create(params);
};
