"use client";
import React from "react";
import type { DocumentElement } from "~/sdk/types";
import { contentSdk } from "~/sdk";
import { ElementSlot } from "./ElementSlot";
import { useDocumentStore } from "~/react";
import { observer } from "mobx-react-lite";
import { useSelectFromState } from "./useSelectFromState";
import { useViewport } from "./useViewportInfo";

interface LiveElementRendererProps {
    element: DocumentElement;
}

export const LiveElementRenderer = observer(({ element }: LiveElementRendererProps) => {
    const documentStore = useDocumentStore();
    const viewport = useViewport();

    const { state, bindings } = useSelectFromState(
        () => documentStore.getDocument(),
        document => {
            return { state: document?.state ?? {}, bindings: document?.bindings ?? {} };
        }
    );

    const { id } = element;

    if (!element || !element.component) {
        return null;
    }

    const instances = contentSdk.resolveElement(element, state, bindings, viewport.displayMode);

    if (!instances) {
        return null;
    }

    return (
        <>
            {instances.map((resolvedElement, index) => {
                const { component: Component, inputs, styles, manifest } = resolvedElement;
                const elementIds = inputs.children ?? [];

                return (
                    <div
                        key={index}
                        style={{ position: "relative", ...styles } as React.CSSProperties}
                    >
                        <Component {...inputs}>
                            {manifest?.acceptsChildren ? (
                                <ElementSlot
                                    parentId={id}
                                    slot={"children"}
                                    elements={elementIds}
                                />
                            ) : null}
                        </Component>
                    </div>
                );
            })}
        </>
    );
});
