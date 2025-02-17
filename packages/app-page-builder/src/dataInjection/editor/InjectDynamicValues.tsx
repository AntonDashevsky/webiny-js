import React from "react";
import { ElementRendererInputs } from "@webiny/app-page-builder-elements";
import { useActiveElement } from "~/editor/index.js";
import { useBindElementInputs } from "~/dataInjection/index.js";

const skipInjection = ["heading", "paragraph"];

export const InjectDynamicValues = ElementRendererInputs.createDecorator(Original => {
    return function ElementRendererInputs(props) {
        const { element, inputs, values } = props;
        const { elementInputs } = useBindElementInputs(element, inputs, values);

        const [activeElement] = useActiveElement();
        const isActive = activeElement?.id === element.id;

        // We don't want to inject preview values when certain elements are active.
        const shouldInject = !isActive || !skipInjection.includes(element.type);

        return <Original {...props} values={shouldInject ? elementInputs : values} />;
    };
});
