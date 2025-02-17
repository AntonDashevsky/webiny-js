import React from "react";
import { ButtonRendererWithVariables } from "~/render/variables/button.js";
import { ParagraphRendererWithVariables } from "~/render/variables/paragraph.js";
import { HeadingRendererWithVariables } from "~/render/variables/heading.js";
import { IconRendererWithVariables } from "~/render/variables/icon.js";

export const InjectElementVariables = () => {
    return (
        <>
            <ButtonRendererWithVariables />
            {/* TODO: <ImageRendererWithVariables />*/}
            <ParagraphRendererWithVariables />
            <HeadingRendererWithVariables />
            <IconRendererWithVariables />
        </>
    );
};
