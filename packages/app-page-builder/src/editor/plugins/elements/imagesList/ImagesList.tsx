import React from "react";
import { PbEditorElement } from "~/types.js";
import PeImagesList from "./PeImagesList.js";

import { Element } from "@webiny/app-page-builder-elements/types.js";

interface ImagesListProps {
    element: PbEditorElement;
}

const ImagesList = (props: ImagesListProps) => {
    const { element, ...rest } = props;
    return <PeImagesList element={element as Element} {...rest} />;
};

export default ImagesList;
