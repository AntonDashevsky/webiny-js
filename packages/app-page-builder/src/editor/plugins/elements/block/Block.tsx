import React from "react";
import { BlockRenderer } from "@webiny/app-page-builder-elements/renderers/block.js";
import { EmptyCell } from "~/editor/plugins/elements/cell/EmptyCell.js";
import { PbEditorElement } from "~/types.js";
import { useElementWithChildren } from "~/editor/index.js";

type Props = Omit<React.ComponentProps<typeof BlockRenderer>, "element"> & {
    element: PbEditorElement;
};

export const Block = (props: Props) => {
    const { element } = props;

    const elementWithChildren = useElementWithChildren(element.id);
    if (!elementWithChildren) {
        return null;
    }

    return (
        <BlockRenderer
            {...props}
            element={elementWithChildren}
            ifEmpty={<EmptyCell element={element} depth={props.meta?.depth} />}
        />
    );
};
