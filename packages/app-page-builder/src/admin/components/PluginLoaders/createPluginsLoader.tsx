import React, { useEffect, useState } from "react";
import type { Plugin } from "@webiny/plugins/types.js";
import { type GenericRecord } from "@webiny/app/types.js";
import { plugins } from "@webiny/plugins";
import { CircularProgress } from "@webiny/ui/Progress/index.js";
import type { PbEditorPageElementPlugin, PbPluginsLoader, PbRenderElementPlugin } from "~/types.js";

export interface CreatePluginsLoaderParams {
    // Plugin type
    type: PbRenderElementPlugin["type"] | PbEditorPageElementPlugin["type"];
    // Plugin factory
    factory: (plugin: PbPluginsLoader) => Promise<Plugin[]> | undefined;
}

const globalCache: GenericRecord<string, boolean> = {};

export interface PluginsLoaderProps {
    children: React.ReactNode;
}

export const createPluginsLoader = ({ type, factory }: CreatePluginsLoaderParams) => {
    const PluginsLoader = ({ children }: PluginsLoaderProps) => {
        const [loaded, setLoaded] = useState(false);

        const loadPlugins = async () => {
            const pluginsLoaders = plugins.byType<PbPluginsLoader>("pb-plugins-loader");

            const lazyLoadedPlugins = await Promise.all(
                pluginsLoaders.map(plugin => factory(plugin)).filter(Boolean)
            );

            // Here comes an awkward hack: there's a chance that a user registered some custom plugins through React,
            // and they're already in the registry. But we want to make sure that user plugins are applied _after_ the lazy-loaded
            // plugins, loaded via the `pb-plugins-loader`. To achieve that, we unregister existing plugins, and register them
            // _after_ the lazy-loaded ones.

            const existingPlugins = plugins.byType(type);

            existingPlugins.forEach(plugin => {
                plugins.unregister(plugin.name);
            });

            // Register lazy-loaded plugins first.
            plugins.register(lazyLoadedPlugins);
            plugins.register(existingPlugins);
        };

        useEffect(() => {
            if (!globalCache[type]) {
                loadPlugins().then(() => {
                    globalCache[type] = true;
                    setLoaded(true);
                });
            } else {
                setLoaded(true);
            }
        }, []);

        return loaded ? <>{children}</> : <CircularProgress />;
    };

    PluginsLoader.displayName = `PluginsLoader<${type}>`;

    return PluginsLoader;
};
