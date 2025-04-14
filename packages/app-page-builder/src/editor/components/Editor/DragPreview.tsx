import React, { useEffect, useState } from "react";
import { DragLayerMonitor, useDragLayer } from "react-dnd";

let subscribedToOffsetChange = false;
let dragPreviewRef: HTMLDivElement | null = null;

const onOffsetChange = (monitor: DragLayerMonitor) => () => {
    if (!dragPreviewRef) {
        return;
    }

    const offset = monitor.getClientOffset();
    if (!offset) {
        return;
    }

    const transform = `translate(${offset.x - 15}px, ${offset.y - 15}px)`;
    dragPreviewRef.style["transform"] = transform;
    /**
     * TS is complaining about -webkit.
     */
    // @ts-expect-error
    dragPreviewRef.style["-webkit-transform"] = transform;
};

const DragPreview = () => {
    const [dragHelperOpacity, setDragHelperOpacity] = useState(0);

    const { isDragging, item } = useDragLayer((monitor: DragLayerMonitor) => {
        if (!subscribedToOffsetChange) {
            // @ts-expect-error
            monitor.subscribeToOffsetChange(onOffsetChange(monitor));
            subscribedToOffsetChange = true;
        }

        return {
            isDragging: monitor.isDragging(),
            item: monitor.getItem()
        };
    });

    useEffect(() => {
        return () => {
            subscribedToOffsetChange = false;
            dragPreviewRef = null;
        };
    }, []);

    // We track the value of "isDragging" and apply opacity=1 (after 100ms), when it switches to true.
    // Without this, the drag cursor would be shown in the top-left corner for a short amount of time, and then it
    // would be repositioned correctly. Definitely looks like a glitch. This also adds a nice little fade-in effect.
    useEffect((): void => {
        if (isDragging) {
            setTimeout(() => {
                setDragHelperOpacity(isDragging ? 1 : 0);
            }, 100);
            return;
        }

        setDragHelperOpacity(0);
    }, [isDragging]);

    if (!isDragging) {
        return null;
    }
    // We don't want to show the drag preview for items being drag in the navigator.
    if (item && item.dragInNavigator) {
        return null;
    }

    return (
        <div
            style={{ zIndex: 1001 }}
            className="wby-fixed wby-pointer-events-none wby-left-0 wby-top-0 wby-w-full wby-h-full"
        >
            <div
                ref={el => (dragPreviewRef = el)}
                className="wby-transition-opacity wby-duration-250 wby-ease-in-out wby-block"
                style={{ opacity: dragHelperOpacity }}
            >
                <div className="wby-size-lg wby-rounded-full wby-bg-primary-default" />
            </div>
        </div>
    );
};

export default DragPreview;
