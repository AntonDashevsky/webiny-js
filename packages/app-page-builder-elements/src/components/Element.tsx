import React from "react";
import { Element as ElementType, RendererMeta } from "~/types.js";
import { usePageElements } from "~/hooks/usePageElements.js";
import ErrorBoundary from "./ErrorBoundary.js";
import { makeDecoratable } from "@webiny/react-composition";

export interface ElementProps {
    element: ElementType;
    meta?: RendererMeta;
}

export const Element = makeDecoratable("Element", (props: ElementProps) => {
    const { getRenderers } = usePageElements();

    const renderers = getRenderers();

    const { element } = props;
    if (!element) {
        return null;
    }

    const ElementRenderer = renderers ? renderers[element.type] : null;
    if (!ElementRenderer) {
        return <div>Missing renderer for {element.type}</div>;
    }

    const meta = {
        ...props.meta,
        templateBlockId: element.data.templateBlockId,
        blockId: element.data.blockId
    };

    return (
        <ErrorBoundary element={element}>
            <ElementRenderer {...props} meta={meta} />
        </ErrorBoundary>
    );
});
