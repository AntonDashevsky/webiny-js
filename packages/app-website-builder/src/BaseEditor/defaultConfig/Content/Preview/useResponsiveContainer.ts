import { useEffect, useMemo, useState } from "react";
import { useBreakpoint } from "~/BaseEditor/hooks/useBreakpoint";
import { ViewportManager } from "@webiny/website-builder-sdk";

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

    const { breakpoint } = useBreakpoint();

    return useMemo(() => {
        return Math.min(containerWidth, breakpoint.maxWidth) + "px";
    }, [breakpoint.name, containerWidth]);
};
