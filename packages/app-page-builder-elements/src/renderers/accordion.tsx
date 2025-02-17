import React from "react";
import { Elements } from "~/components/Elements.js";
import { createRenderer } from "~/createRenderer.js";
import { useRenderer } from "~/hooks/useRenderer.js";

export type AccordionRenderer = ReturnType<typeof createAccordion>;

export const createAccordion = () => {
    return createRenderer(
        () => {
            const { getElement } = useRenderer();

            const element = getElement();
            return <Elements element={element} />;
        },
        {
            baseStyles: {
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                width: "100%"
            }
        }
    );
};
