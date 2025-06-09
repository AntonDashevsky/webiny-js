import kebabCase from "lodash/kebabCase.js";
import { type PluginCollection } from "@webiny/plugins/types.js";
import {
    type PbRenderElementPluginArgs,
    type PbRenderElementPlugin,
    type PbPageElementImagesListComponentPlugin
} from "~/types.js";

import { createDefaultImagesListComponent } from "@webiny/app-page-builder-elements/renderers/imagesList/imagesComponents/index.js";
import { createImagesList } from "@webiny/app-page-builder-elements/renderers/imagesList/index.js";
import { plugins } from "@webiny/plugins";

export default (args: PbRenderElementPluginArgs = {}): PluginCollection => {
    const elementType = kebabCase(args.elementType || "images-list");

    return [
        {
            name: `pb-render-page-element-${elementType}`,
            type: "pb-render-page-element",
            elementType: elementType,
            render: createImagesList({
                imagesListComponents: () => {
                    const registeredPlugins =
                        plugins.byType<PbPageElementImagesListComponentPlugin>(
                            "pb-page-element-images-list-component"
                        );

                    return registeredPlugins.map(plugin => {
                        return {
                            id: plugin.componentName,
                            name: plugin.title,
                            component: plugin.component
                        };
                    });
                }
            })
        } as PbRenderElementPlugin,
        {
            name: "pb-page-element-images-list-component-mosaic",
            type: "pb-page-element-images-list-component",
            title: "Mosaic",
            componentName: "mosaic",
            component: createDefaultImagesListComponent()
        } as PbPageElementImagesListComponentPlugin
    ];
};
