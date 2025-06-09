import React from "react";
import { type PbEditorElement } from "~/types.js";
import PeImagesList from "./PeImagesList.js";

import { type Element } from "@webiny/app-page-builder-elements/types.js";

interface ImagesListProps {
    element: PbEditorElement;
}

const ImagesList = (props: ImagesListProps) => {
    const { element, ...rest } = props;
    return <PeImagesList element={element as Element} {...rest} />;
};

export default ImagesList;
