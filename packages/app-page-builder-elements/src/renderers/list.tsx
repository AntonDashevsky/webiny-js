import React from "react";
import { createRenderer } from "~/createRenderer.js";
import { useRenderer } from "~/hooks/useRenderer.js";

export type ListRenderer = ReturnType<typeof createList>;

export const createList = () => {
    return createRenderer(() => {
        const { getElement } = useRenderer();
        const element = getElement();

        const __html = element.data.text.data.text;

        return <div style={{ width: "100%" }} dangerouslySetInnerHTML={{ __html }} />;
    });
};
