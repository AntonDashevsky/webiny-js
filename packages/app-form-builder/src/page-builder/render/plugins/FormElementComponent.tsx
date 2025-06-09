import React from "react";
import { type PbEditorElement } from "@webiny/app-page-builder/types.js";
import PeForm from "./PeFormElement.js";

import { type Element } from "@webiny/app-page-builder-elements/types.js";

interface FormProps {
    element: PbEditorElement;
}

const FormElementComponent = (props: FormProps) => {
    const { element, ...rest } = props;
    return <PeForm element={element as Element} {...rest} />;
};

export default FormElementComponent;
