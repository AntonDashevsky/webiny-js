import type { ApwContentTypes } from "~/types";
import type { PluginsContainer } from "@webiny/plugins";
import { ContentApwSettingsPlugin } from "~/ContentApwSettingsPlugin";
import { NotFoundError } from "@webiny/handler-graphql";

interface GetContentApwSettingsPluginParams {
    type: ApwContentTypes;
    plugins: PluginsContainer;
}
export const getContentApwSettingsPlugin = <
    T extends ContentApwSettingsPlugin = ContentApwSettingsPlugin
>(
    params: GetContentApwSettingsPluginParams
): T => {
    const { type, plugins } = params;
    const plugin = plugins.byType<T>(ContentApwSettingsPlugin.type).find(p => p.canUse(type));
    if (plugin) {
        return plugin;
    }
    throw new NotFoundError(`Could not find a "ContentApwSettingsPlugin" for "${type}".`);
};
