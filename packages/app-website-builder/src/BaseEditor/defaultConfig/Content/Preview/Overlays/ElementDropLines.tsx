import React from "react";
import { useDragLayer } from "react-dnd";
import { DropLine } from "./DropLine";
import { useIsDragging } from "../useIsDragging";
import { useProximityDropzone } from "../useProximityDropzone";
import { Box } from "../Box";

interface ElementDropZonesProps {
    editorBox: Box;
    previewBox: Box;
    isFirst: boolean;
    isHighlighted: boolean;
}

export const ElementDropLines = ({ editorBox, previewBox, isFirst }: ElementDropZonesProps) => {
    const draggingItem = useDragLayer(monitor => monitor.getItem());
    const isDragging = draggingItem && draggingItem.id === previewBox.id;

    const { proximity } = useProximityDropzone({
        id: previewBox.id,
        box: editorBox
    });

    const anyElementDragged = useIsDragging();
    const hoverBefore = proximity?.position === 0;
    const hoverAfter = proximity?.position === 1;

    return anyElementDragged ? (
        <>
            {!isDragging && isFirst && <DropLine top={0} visible={hoverBefore} dimmed={false} />}
            {!isDragging && (
                <DropLine top={previewBox?.height - 2} visible={hoverAfter} dimmed={false} />
            )}
        </>
    ) : null;
};
