import React from "react";
import { DocumentElement } from "~/sdk/types";
import { useComponent } from "~/BaseEditor/hooks/useComponent";

interface ElementInputsProps {
    element: DocumentElement;
}

export const ElementInputs = ({ element }: ElementInputsProps) => {
    const component = useComponent(element.component.name);


    return <pre>{JSON.stringify(component.inputs, null, 2)}</pre>;
};
