import { useEffect, useMemo, useState } from "react";
import { useDisplayMode } from "~/BaseEditor/hooks/useDisplayMode";
import { ViewportManager } from "~/sdk/ViewportManager";

/**
 * Calculate the real width of the preview container, taking into account the current display mode
 * and actual container size. If the display mode width is larger than the available space, return the
 * width of the available space.
 */
export const useResponsiveContainer = (viewportManager: ViewportManager) => {
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        const updateContainerWidth = () => {
            const width = document.body.clientWidth - 600;
            setContainerWidth(width);
        };

        updateContainerWidth();

        return viewportManager.onViewportChangeEnd(updateContainerWidth);
    }, []);

    const { displayMode } = useDisplayMode();

    return useMemo(() => {
        return Math.min(containerWidth, displayMode.maxWidth) + "px";
    }, [displayMode.name, containerWidth]);
};
