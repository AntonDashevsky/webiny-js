import { useEffect, useMemo, useState } from "react";
import { useDisplayMode } from "~/BaseEditor/hooks/useDisplayMode";

/**
 * Calculate the real width of the preview container, taking into account the current display mode
 * and thee actual container size. If the display mode width is larger than the available space, return the
 * width of the available space.
 */
export const useResponsiveContainer = (getter: () => HTMLDivElement | null) => {
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        const updateContainerWidth = () => {
            const container = getter();
            const width = container ? container.clientWidth : 0;
            setContainerWidth(width);
        };

        window.addEventListener("resize", updateContainerWidth, { passive: true });

        updateContainerWidth();

        return () => {
            window.removeEventListener("resize", updateContainerWidth);
        };
    }, []);

    const { displayMode } = useDisplayMode();

    return useMemo(() => {
        return Math.min(containerWidth, displayMode.maxWidth) + "px";
    }, [displayMode.name, containerWidth]);
};
