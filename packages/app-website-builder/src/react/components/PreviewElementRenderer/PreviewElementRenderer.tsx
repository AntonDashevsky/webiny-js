"use client";
import React, { useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { DocumentElement } from "~/sdk/types";
import { PreviewElementRendererPresenter } from "./PreviewElementRenderer.presenter";
import { LiveElementRenderer } from "../LiveElementRenderer";
import { useElementSlotDepth } from "~/react/components/ElementSlotDepthProvider";
import { useElementIndex } from "~/react/components/ElementIndexProvider";
import { useDocumentStore } from "../DocumentStoreProvider";

interface PreviewElementRendererProps {
    element: DocumentElement;
}

const styles = { display: "contents" };

export const PreviewElementRenderer = observer((props: PreviewElementRendererProps) => {
    const documentStore = useDocumentStore();
    const depth = useElementSlotDepth();
    const index = useElementIndex();

    const presenter = useMemo(() => {
        return new PreviewElementRendererPresenter(documentStore);
    }, [props.element?.id]);

    useEffect(() => {
        if (!props.element) {
            return;
        }
        presenter.init(props.element);
        presenter.observeDOM();
    }, [props.element?.id]);

    useEffect(() => {
        return () => {
            presenter.dispose();
        };
    }, []);

    const element = presenter.vm.element;

    if (!element || !element.id) {
        return null;
    }

    return (
        <div
            style={styles}
            onMouseEnter={presenter.onMouseEnter}
            data-element-id={element.id}
            data-depth={depth}
            data-parent-index={index}
            data-parent-id={element.parent?.id}
            data-parent-slot={element.parent?.slot}
        >
            <LiveElementRenderer element={element} />
        </div>
    );
});
