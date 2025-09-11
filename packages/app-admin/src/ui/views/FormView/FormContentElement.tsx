import React from "react";
import type { UiElementRenderProps } from "~/ui/UIElement.js";
import { UIElement } from "~/ui/UIElement.js";
import { SimpleFormContent } from "~/components/SimpleForm/index.js";

export class FormContentElement extends UIElement {
    public override render(props: UiElementRenderProps) {
        return <SimpleFormContent>{super.render(props)}</SimpleFormContent>;
    }
}
