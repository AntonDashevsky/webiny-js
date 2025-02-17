import React from "react";
import { PbElement } from "~/types.js";
import { Element as PeElement } from "@webiny/app-page-builder-elements/components/Element.js";
import { Element as ElementType } from "@webiny/app-page-builder-elements/types.js";

export interface ElementProps {
    element: PbElement | null;
}

const Element = (props: ElementProps) => {
    const { element } = props;

    // With the new engine, we can simply use the `PeElement` component
    // and the rest of the rendering will happen recursively.
    return <PeElement element={element as ElementType} />;
};

export default Element;
