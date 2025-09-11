import React from "react";
import type { UiElementRenderProps } from "~/ui/UIElement";
import { UIElement } from "~/ui/UIElement";
import { SimpleFormContent } from "~/components/SimpleForm";

export class FormContentElement extends UIElement {
    public override render(props: UiElementRenderProps) {
        return <SimpleFormContent>{super.render(props)}</SimpleFormContent>;
    }
}
