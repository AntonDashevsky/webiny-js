import React from "react";
import { useActiveElement } from "~/BaseEditor/hooks/useActiveElement";
import { ElementInputs } from "./ElementInputs";

export const ElementSettings = () => {
    const [element] = useActiveElement();

    if (!element) {
        return null;
    }

    return <ElementInputs element={element} />;
};
