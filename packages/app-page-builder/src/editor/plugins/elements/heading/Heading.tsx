import React from "react";
import { CompositionScope } from "@webiny/app-admin";
import { type Element } from "@webiny/app-page-builder-elements/types.js";
import { HeadingRenderer } from "@webiny/app-page-builder-elements/renderers/heading.js";
import { type MediumEditorOptions, type PbEditorElement } from "~/types.js";
import { useActiveElementId } from "~/editor/index.js";
import { ActiveHeadingRenderer } from "./ActiveHeadingRenderer.js";

interface HeadingProps {
    element: PbEditorElement;
    mediumEditorOptions?: MediumEditorOptions;
}

export const Heading = (props: HeadingProps) => {
    const { element, ...rest } = props;
    const [activeElementId] = useActiveElementId();
    const isActive = activeElementId === element.id;

    if (isActive) {
        return (
            <CompositionScope name={"pb.heading"}>
                <ActiveHeadingRenderer element={element as Element} {...rest} />
            </CompositionScope>
        );
    }

    return <HeadingRenderer element={element as Element} {...rest} />;
};
