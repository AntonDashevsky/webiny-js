import React from "react";
import type { UiElementRenderProps } from "~/ui/UIElement";
import { UIElement } from "~/ui/UIElement";
import { SimpleFormFooter } from "~/components/SimpleForm";

export class FormFooterElement extends UIElement {
    public constructor(id: string) {
        super(id);

        this.useGrid(false);
    }

    public override render(props: UiElementRenderProps) {
        return <SimpleFormFooter>{super.render(props)}</SimpleFormFooter>;
    }
}
