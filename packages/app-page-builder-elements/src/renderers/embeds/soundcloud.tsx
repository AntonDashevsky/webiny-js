import React from "react";

import { OEmbed } from "./components/OEmbed.js";
import { createRenderer } from "~/createRenderer.js";
import { useRenderer } from "~/hooks/useRenderer.js";

export const createSoundcloud = () => {
    return createRenderer(() => {
        const { getElement } = useRenderer();

        return <OEmbed element={getElement()} />;
    });
};
