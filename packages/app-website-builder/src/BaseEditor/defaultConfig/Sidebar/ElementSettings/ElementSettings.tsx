import React from "react";
import { useActiveElement } from "~/BaseEditor/hooks/useActiveElement.js";
import { ElementInputs } from "./ElementInputs.js";

export const ElementSettings = () => {
    const [element] = useActiveElement();

    if (!element) {
        return null;
    }

    return <ElementInputs element={element} />;
};
