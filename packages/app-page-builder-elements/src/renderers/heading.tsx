import React from "react";
import { createRenderer } from "~/createRenderer.js";
import { useRenderer } from "~/hooks/useRenderer.js";
import { ElementInput } from "~/inputs/ElementInput.js";
import { isJson } from "~/renderers/isJson.js";

export const elementInputs = {
    text: ElementInput.create<string>({
        name: "text",
        type: "lexical",
        translatable: true,
        getDefaultValue: ({ element }) => {
            return element.data.text.data.text;
        }
    }),
    /**
     * `tag` is an element input which exists for backwards compatibility with older rich-text implementations.
     */
    tag: ElementInput.create<string>({
        name: "tag",
        type: "htmlTag",
        getDefaultValue: ({ element }) => {
            return element.data.text.desktop.tag;
        }
    })
};

export const HeadingRenderer = createRenderer<unknown, typeof elementInputs>(
    () => {
        const { getInputValues } = useRenderer();
        const inputs = getInputValues<typeof elementInputs>();
        const content = inputs.text || "";
        const tag = inputs.tag || "h1";

        if (isJson(content)) {
            return null;
        }

        return React.createElement(tag, {
            dangerouslySetInnerHTML: { __html: content }
        });
    },
    { inputs: elementInputs }
);
