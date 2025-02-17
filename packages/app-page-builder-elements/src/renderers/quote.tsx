import React from "react";
import { createRenderer } from "~/createRenderer.js";
import { useRenderer } from "~/hooks/useRenderer.js";

export type QuoteRenderer = ReturnType<typeof createQuote>;

export const createQuote = () => {
    return createRenderer(() => {
        const { getElement } = useRenderer();
        const element = getElement();
        const __html = element.data.text.data.text;
        return <div dangerouslySetInnerHTML={{ __html }} />;
    });
};
