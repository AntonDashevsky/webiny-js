import React from "react";
import { Elements } from "~/components/Elements.js";
import { createRenderer } from "~/createRenderer.js";
import { useRenderer } from "~/hooks/useRenderer.js";
import { Element } from "~/types.js";

interface Props {
    elements?: Element[];
}

export type DocumentRenderer = ReturnType<typeof createDocument>;

export const createDocument = () => {
    return createRenderer<Props>(() => {
        const { getElement } = useRenderer();

        const element = getElement();
        return <Elements element={element} />;
    });
};
