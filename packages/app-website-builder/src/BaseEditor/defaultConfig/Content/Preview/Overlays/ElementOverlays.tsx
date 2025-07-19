import React, { Fragment, useCallback, useRef } from "react";
import { observer } from "mobx-react-lite";
import { useDrop } from "react-dnd";
import styled from "@emotion/styled";

import { usePreviewData } from "~/BaseEditor/hooks/usePreviewData";
import { useSelectFromEditor } from "~/BaseEditor/hooks/useSelectFromEditor";
import { ElementOverlay } from "./ElementOverlay";
import { PreviewViewportInfo, SlotInput } from "@webiny/website-builder-sdk";
import { useIsDragging } from "../useIsDragging";
import { Box } from "../Box";
import { DropEvent } from "../useProximityDropzone";
import { useDocumentEditor } from "~/DocumentEditor";
import { ElementDropLines } from "./ElementDropLines";
import { DropBox } from "./DropBox";
import { useDropZoneManager } from "../DropZoneManagerProvider";
import { mergeRefs } from "../mergeRefs";
import { Commands } from "~/BaseEditor";
import { Editor } from "~/editorSdk/Editor";
import { ComponentManifestToAstConverter } from "@webiny/website-builder-sdk";
import { findMatchingAstNode } from "@webiny/website-builder-sdk";

const OverlayContainer = styled("div")({
    overflow: "hidden",
    position: "absolute",
    zIndex: 20
});

const filterVisibleBoxes = (viewport: PreviewViewportInfo) => {
    return (box: Box) => {
        const verticallyVisible = box.top + box.height > 0 && box.top < viewport.height;

        const horizontallyVisible = box.left + box.width > 0 && box.left < viewport.width;
        return verticallyVisible && horizontallyVisible;
    };
};

const filterElements = (box: Box) => {
    return box.type === "element" && box.id !== "root";
};

const filterSlots = (box: Box) => {
    return box.type === "element-slot";
};

export const ElementOverlays = observer(() => {
    const dropzoneManager = useDropZoneManager();
    const editor = useDocumentEditor();
    const { boxes, viewport } = usePreviewData();
    const isDragging = useIsDragging();
    const { showOverlays, selectedElement, highlightedElement } = useSelectFromEditor(state => {
        return {
            showOverlays: state.showOverlays,
            selectedElement: state.selectedElement,
            highlightedElement: state.highlightedElement
        };
    });

    const dropRef = useRef<HTMLElement | null>(null);

    const [, drop] = useDrop(() => ({
        accept: "ELEMENT",
        drop: (item: any) => {
            const target = dropzoneManager.getLastMatchedPosition();
            if (target) {
                onDrop({ item, target });
            }
        }
    }));

    drop(dropRef);

    const canDropComponentIntoTarget = (
        editor: Editor,
        componentName: string,
        target: DropEvent["target"]
    ) => {
        // Determine component manifest from drop target.
        const document = editor.getDocumentState().read();
        const { component } = document.elements[target.parentId];
        const componentManifest = editor.getEditorState().read().components[component.name];

        // Find target input using AST.
        const inputsAst = ComponentManifestToAstConverter.convert(componentManifest.inputs ?? []);
        const targetInputNode = findMatchingAstNode(target.slot, inputsAst);

        let canAcceptComponent = targetInputNode !== undefined;
        if (targetInputNode) {
            const slotInput = targetInputNode.input as SlotInput;
            const whitelistedComponents = slotInput.components;
            if (whitelistedComponents && whitelistedComponents.length > 0) {
                canAcceptComponent = whitelistedComponents.includes(componentName);
            }
        }
        return canAcceptComponent;
    };

    const onDrop = useCallback(
        ({ item, target }: DropEvent) => {
            if (!canDropComponentIntoTarget(editor, item.componentName, target)) {
                return;
            }

            if (item.id) {
                // We're moving an existing element.
                editor.executeCommand(Commands.MoveElement, {
                    elementId: item.id,
                    parentId: target.parentId,
                    slot: target.slot,
                    index: target.index
                });
            } else {
                // We're creating a new element.
                editor.executeCommand(Commands.CreateElement, {
                    componentName: item.componentName,
                    parentId: target.parentId,
                    slot: target.slot,
                    index: target.index
                });
            }
        },
        [editor]
    );

    return (
        <OverlayContainer
            ref={mergeRefs(dropRef)}
            style={{
                width: `${viewport.width}px`,
                height: `${viewport.height}px`,
                display: showOverlays ? "block" : "none",
                pointerEvents: isDragging ? "auto" : "none"
            }}
        >
            {boxes.preview
                .filter(filterElements)
                .filter(filterVisibleBoxes(viewport))
                .map(box => (
                    <Fragment key={box.id}>
                        <ElementOverlay
                            elementId={box.id}
                            isSelected={selectedElement === box.id}
                            isHighlighted={highlightedElement === box.id}
                            previewBox={box}
                            editorBox={boxes.editor.get(box.id)!}
                        >
                            <>
                                <ElementDropLines
                                    isFirst={box.parentIndex === 0}
                                    isHighlighted={highlightedElement === box.id}
                                    editorBox={boxes.editor.get(box.id)!}
                                    previewBox={box}
                                />
                            </>
                        </ElementOverlay>
                    </Fragment>
                ))}
            {boxes.preview
                .filter(filterSlots)
                .filter(filterVisibleBoxes(viewport))
                .map(box => (
                    <DropBox key={box.id} box={box} onDrop={onDrop} />
                ))}
        </OverlayContainer>
    );
});
