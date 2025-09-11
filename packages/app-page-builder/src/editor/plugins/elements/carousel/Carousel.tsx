import React from "react";
import type { PbEditorElement } from "~/types";

import PeCarousel from "./PeCarousel";
import type { Element } from "@webiny/app-page-builder-elements/types";

interface CarouselProps {
    element: PbEditorElement;
}

const Carousel = (props: CarouselProps) => {
    const { element, ...rest } = props;
    return <PeCarousel element={element as Element} {...rest} />;
};

export default Carousel;
