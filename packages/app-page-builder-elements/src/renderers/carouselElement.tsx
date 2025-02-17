import React from "react";
import { Elements } from "~/components/Elements.js";
import { createRenderer } from "~/createRenderer.js";
import { useRenderer } from "~/hooks/useRenderer.js";

export type CarouselElementRenderer = ReturnType<typeof createCarouselElement>;

export const createCarouselElement = () => {
    return createRenderer(() => {
        const { getElement } = useRenderer();

        const element = getElement();
        return <Elements element={element} />;
    });
};
