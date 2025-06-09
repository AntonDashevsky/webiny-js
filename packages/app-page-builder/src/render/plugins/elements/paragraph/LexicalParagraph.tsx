import React from "react";
import {
    type elementInputs,
    ParagraphRenderer
} from "@webiny/app-page-builder-elements/renderers/paragraph.js";
import { usePageElements, useRenderer } from "@webiny/app-page-builder-elements";
import { assignStyles } from "@webiny/app-page-builder-elements/utils/index.js";
import { isValidLexicalData, LexicalHtmlRenderer } from "@webiny/lexical-editor";
import { type ComponentDecorator, CompositionScope } from "@webiny/app";
import type { Renderer } from "@webiny/app-page-builder-elements/types.js";

export const LexicalParagraphDecorator: ComponentDecorator<Renderer> = Original => {
    return function LexicalParagraphRenderer(props) {
        const { theme } = usePageElements();
        const { getInputValues } = useRenderer();
        const inputs = getInputValues<typeof elementInputs>();
        const __html = inputs.text || "";

        if (isValidLexicalData(__html)) {
            return (
                <CompositionScope name={"pb.paragraph"}>
                    <LexicalHtmlRenderer
                        theme={theme}
                        themeStylesTransformer={styles => {
                            return assignStyles({
                                breakpoints: theme.breakpoints,
                                styles
                            });
                        }}
                        value={__html || ""}
                    />
                </CompositionScope>
            );
        }

        return <Original {...props} />;
    };
};

export const LexicalParagraphRenderer =
    ParagraphRenderer.Component.createDecorator(LexicalParagraphDecorator);
