import React from "react";
import { PbEditorElement } from "~/types.js";

import PeCarousel from "./PeCarousel.js";
import { Element } from "@webiny/app-page-builder-elements/types.js";

interface CarouselProps {
    element: PbEditorElement;
}

const Carousel = (props: CarouselProps) => {
    const { element, ...rest } = props;
    return <PeCarousel element={element as Element} {...rest} />;
};

export default Carousel;
