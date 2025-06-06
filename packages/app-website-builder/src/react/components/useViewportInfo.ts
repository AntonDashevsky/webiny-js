import { useEffect, useState } from "react";
import { viewportManager } from "~/sdk";

export const useViewport = () => {
    const [viewport, setViewport] = useState(viewportManager.getViewport());

    useEffect(() => {
        return viewportManager.onViewportChangeEnd(setViewport);
    }, []);

    return viewport;
};
