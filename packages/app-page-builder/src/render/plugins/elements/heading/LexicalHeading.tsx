import React from "react";
import type { elementInputs } from "@webiny/app-page-builder-elements/renderers/heading";
import { HeadingRenderer } from "@webiny/app-page-builder-elements/renderers/heading";
import { usePageElements, useRenderer } from "@webiny/app-page-builder-elements";
import { assignStyles } from "@webiny/app-page-builder-elements/utils";
import { isValidLexicalData, LexicalHtmlRenderer } from "@webiny/lexical-editor";
import type { ComponentDecorator } from "@webiny/app";
import { CompositionScope } from "@webiny/app";
import type { Renderer } from "@webiny/app-page-builder-elements/types";

export const LexicalHeadingDecorator: ComponentDecorator<Renderer> = Original => {
    return function LexicalHeadingRenderer(props) {
        const { theme } = usePageElements();
        const { getInputValues } = useRenderer();
        const inputs = getInputValues<typeof elementInputs>();
        const __html = inputs.text || "";

        if (isValidLexicalData(__html)) {
            return (
                <CompositionScope name={"pb.heading"}>
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

export const LexicalHeadingRenderer =
    HeadingRenderer.Component.createDecorator(LexicalHeadingDecorator);
