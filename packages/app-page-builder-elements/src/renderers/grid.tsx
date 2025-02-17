import React from "react";
import { Elements } from "~/components/Elements.js";
import { createRenderer } from "~/createRenderer.js";
import { useRenderer } from "~/hooks/useRenderer.js";

export const GridRenderer = createRenderer(
    () => {
        const { getElement } = useRenderer();

        const element = getElement();
        return <Elements element={element} />;
    },
    {
        baseStyles: {
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "100%"
        }
    }
);
