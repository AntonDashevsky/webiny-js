import React from "react";
import { type PbEditorElement } from "~/types.js";

import PeCarouselElement from "./PeCarouselElement.js";
import { type Element } from "@webiny/app-page-builder-elements/types.js";

interface CarouselElementProps {
    element: PbEditorElement;
}

const CarouselElement = (props: CarouselElementProps) => {
    const { element, ...rest } = props;
    return <PeCarouselElement element={element as Element} {...rest} />;
};

export default CarouselElement;
