import React, { useCallback } from "react";
import { cn } from "@webiny/admin-ui";
import { useDocumentEditor } from "~/DocumentEditor";
import { Box } from "../Box";
import { $selectElement } from "~/editorSdk/utils";
import { Draggable } from "~/BaseEditor/components/Draggable";
import { useIsDragging } from "~/BaseEditor/defaultConfig/Content/Preview/useIsDragging";
import { useSelectFromEditor } from "~/BaseEditor/hooks/useSelectFromEditor";
import { useSelectFromDocument } from "~/BaseEditor/hooks/useSelectFromDocument";

interface ElementOverlayProps {
    elementId: string;
    isSelected: boolean;
    isHighlighted: boolean;
    previewBox: Box;
    editorBox: Box;
    children: React.ReactNode;
}

export const ElementOverlay = React.memo(
    ({
        previewBox,
        editorBox,
        elementId,
        isSelected,
        isHighlighted,
        children
    }: ElementOverlayProps) => {
        const editor = useDocumentEditor();
        const element = useSelectFromDocument(state => {
            return state.elements[elementId];
        });

        const componentName = useSelectFromEditor(
            state => {
                if (!element) {
                    return "";
                }
                const component = state.components[element.component.name];

                return component.label ?? component.name;
            },
            [element]
        );

        const onClick = useCallback(() => {
            $selectElement(editor, elementId);
        }, []);

        const dnd = useIsDragging();

        const pointerEvents = isSelected || isHighlighted ? "auto" : "none";

        return (
            <Draggable type="ELEMENT" item={{ id: elementId }}>
                {({ isDragging, dragRef }) => (
                    <>
                        <div
                            className={cn(
                                "wby-absolute wby-box-border wby-text-right",
                                "data-[state=hover]:wby-border-md data-[state=hover]:wby-border-success-default",
                                "data-[state=active]:wby-border-md data-[state=active]:wby-border-accent-default"
                            )}
                            onClick={onClick}
                            data-state={
                                isSelected ? "active" : isHighlighted && !dnd ? "hover" : null
                            }
                            data-element-id={elementId}
                            data-role={"element-overlay"}
                            ref={dragRef}
                            style={{
                                zIndex: 100 + previewBox.depth,
                                top: previewBox.top,
                                left: previewBox.left,
                                width: previewBox.width,
                                height: previewBox.height,
                                pointerEvents,
                                opacity: isDragging ? 0.3 : 1
                            }}
                        >
                            {(isHighlighted && !dnd) || isSelected ? (
                                <div
                                    className={cn(
                                        "wby-absolute wby-text-sm wby-pointer-events-none wby-text-neutral-light wby-p-xs",
                                        isHighlighted ? "wby-bg-success-default" : undefined,
                                        isSelected ? "wby-bg-primary-default" : undefined
                                    )}
                                    style={{ top: -24, left: -2 }}
                                >
                                    {componentName}
                                    {/* ({element.id}) (isFirst: {isFirst.toString()}, index: {index.toString()})*/}
                                </div>
                            ) : null}
                            {children}
                        </div>
                    </>
                )}
            </Draggable>
        );
    }
);

ElementOverlay.displayName = "ElementOverlay";
