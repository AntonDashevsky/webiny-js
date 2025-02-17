import React from "react";
import { PbEditorElement } from "~/types.js";
import PeIframe from "./PeIFrame.js";

import { Element } from "@webiny/app-page-builder-elements/types.js";

interface IframeProps {
    element: PbEditorElement;
}

const Iframe = (props: IframeProps) => {
    const { element, ...rest } = props;
    return <PeIframe element={element as Element} {...rest} />;
};

export default Iframe;
