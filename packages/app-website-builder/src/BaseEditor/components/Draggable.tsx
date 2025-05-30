import { useDrag } from "react-dnd";
import React, { useEffect } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";
import deepEqual from "deep-equal";

interface DraggableProps<T> {
    type: string;
    item: T;
    canDrag?: boolean;
    children: (props: { isDragging: boolean; dragRef: React.Ref<any> }) => React.ReactNode;
}

export const Draggable = React.memo(
    <T = any,>({ type, item, canDrag = true, children }: DraggableProps<T>) => {
        const [{ isDragging }, dragRef, previewRef] = useDrag(
            () => ({
                type,
                item,
                canDrag,
                collect: monitor => ({
                    isDragging: monitor.isDragging()
                })
            }),
            [type, item, canDrag]
        );

        useEffect(() => {
            previewRef(getEmptyImage(), { captureDraggingState: true });
        }, [previewRef]);

        return <>{children({ isDragging, dragRef })}</>;
    }
);

Draggable.displayName = "Draggable";
