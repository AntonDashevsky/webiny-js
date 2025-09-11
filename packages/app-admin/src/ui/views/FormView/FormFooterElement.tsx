import React from "react";
import type { UiElementRenderProps } from "~/ui/UIElement.js";
import { UIElement } from "~/ui/UIElement.js";
import { SimpleFormFooter } from "~/components/SimpleForm/index.js";

export class FormFooterElement extends UIElement {
    public constructor(id: string) {
        super(id);

        this.useGrid(false);
    }

    public override render(props: UiElementRenderProps) {
        return <SimpleFormFooter>{super.render(props)}</SimpleFormFooter>;
    }
}
