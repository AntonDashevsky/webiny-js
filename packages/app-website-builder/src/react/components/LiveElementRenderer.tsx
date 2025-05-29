import React from "react";
import type { DocumentElement } from "~/sdk/types";
import { contentSdk } from "~/sdk";
import { ElementSlot } from "./ElementSlot";

interface LiveElementRendererProps {
    element: DocumentElement;
}

export const LiveElementRenderer = ({ element }: LiveElementRendererProps) => {
    const { id } = element;

    if (!element || !element.component) {
        return null;
    }

    const resolvedElement = contentSdk.resolveElement(element);

    if (!resolvedElement) {
        return null;
    }

    const { component: Component, inputs, styles, manifest } = resolvedElement;

    return (
        //  TODO: Figure out proper styles application.
        <div style={{ position: "relative", ...styles } as React.CSSProperties}>
            <Component {...inputs}>
                {manifest?.acceptsChildren ? (
                    <ElementSlot
                        parentId={id}
                        slot={"children"}
                        elements={element.component.inputs.children ?? []}
                    />
                ) : null}
            </Component>
        </div>
    );
};
