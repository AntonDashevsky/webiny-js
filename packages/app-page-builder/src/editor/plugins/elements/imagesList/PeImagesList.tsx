import { PbPageElementImagesListComponentPlugin } from "~/types.js";
import { createImagesList } from "@webiny/app-page-builder-elements/renderers/imagesList/index.js";
import { plugins } from "@webiny/plugins";
import { useElementVariableValue } from "~/editor/hooks/useElementVariableValue.js";
import { Element } from "@webiny/app-page-builder-elements/types.js";
import React from "react";

const ImagesList = createImagesList({
    imagesListComponents: () => {
        const registeredPlugins = plugins.byType<PbPageElementImagesListComponentPlugin>(
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
});

interface Props {
    element: Element;
}

const PeImagesList = (props: Props) => {
    const { element } = props;
    const variableValue = useElementVariableValue(element);
    if (variableValue) {
        return <ImagesList {...props} images={variableValue} />;
    }

    return <ImagesList {...props} />;
};

export default PeImagesList;
