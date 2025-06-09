import { createRenderer, Elements, useRenderer } from "@webiny/app-page-builder-elements";
import { type Element } from "@webiny/app-page-builder-elements/types.js";
import { useRecoilValue } from "recoil";
import { elementWithChildrenByIdSelector } from "~/editor/recoil/modules/index.js";
import React from "react";

const PeDocument = createRenderer(() => {
    const { getElement } = useRenderer();

    const element = getElement();
    const elementWithChildren = useRecoilValue(elementWithChildrenByIdSelector(element.id));

    return <Elements element={elementWithChildren as Element} />;
});

export default PeDocument;
