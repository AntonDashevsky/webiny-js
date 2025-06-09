import React from "react";
import { type PbEditorElement } from "~/types.js";
import PeIframe from "./PeIFrame.js";

import { type Element } from "@webiny/app-page-builder-elements/types.js";

interface IframeProps {
    element: PbEditorElement;
}

const Iframe = (props: IframeProps) => {
    const { element, ...rest } = props;
    return <PeIframe element={element as Element} {...rest} />;
};

export default Iframe;
