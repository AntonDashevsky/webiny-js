import React from "react";

import { OEmbed } from "./components/OEmbed.js";
import { createRenderer } from "~/createRenderer.js";
import { useRenderer } from "~/hooks/useRenderer.js";

export const createCodesandbox = () => {
    return createRenderer(() => {
        const { getElement } = useRenderer();
        const element = getElement();

        return <OEmbed element={element} />;
    });
};
