"use client";
import React, { useCallback } from "react";
import { observer } from "mobx-react-lite";
import type { DocumentElement, DocumentElementBindings } from "~/sdk/types";
import { contentSdk } from "~/sdk";
import { ElementSlot } from "./ElementSlot";
import { useViewport } from "./useViewportInfo";
import type { OnResolved } from "~/sdk/BindingsResolver";
import { useBindingForElement } from "./useBindingForElement";
import { useDocumentState } from "./useDocumentState";

interface LiveElementRendererProps {
    element: DocumentElement;
    bindings?: DocumentElementBindings;
}

export const LiveElementRenderer = observer(({ element }: LiveElementRendererProps) => {
    const viewport = useViewport();

    // We want to deep-track bindings, and re-render on any change to bindings.
    const elementBindings = useBindingForElement(element.id);
    const state = useDocumentState();

    const onResolved = useCallback(
        ((value, input) => {
            if (input.type === "slot") {
                return (
                    <ElementSlot
                        key={element.id}
                        parentId={element.id}
                        slot={input.name}
                        elements={input.list ? value : [value]}
                    />
                );
            }
            return value;
        }) as OnResolved,
        [element.id]
    );

    if (!element || !element.component) {
        return null;
    }

    const instances = contentSdk.resolveElement({
        element,
        state,
        elementBindings,
        breakpoint: viewport.breakpoint,
        onResolved
    });

    if (!instances) {
        return null;
    }

    return (
        <>
            {instances.map((resolvedElement, index) => {
                const { component: Component, inputs, styles, manifest } = resolvedElement;

                return (
                    <div
                        key={index}
                        style={{ position: "relative", ...styles } as React.CSSProperties}
                    >
                        <Component {...inputs} element={element}>
                            {manifest?.acceptsChildren ? inputs.children : null}
                        </Component>
                    </div>
                );
            })}
        </>
    );
});
