import type React from "react";
import { UIElement, type UiElementRenderProps } from "~/ui/UIElement.js";
// import styled from "@emotion/styled";

// const DynamicFieldsetRow = styled("div")({
//     paddingBottom: 10
// });

// !GOOD FIRST ISSUE!
// Extract rendering and styling into a DynamicFieldsetRowElementRenderer class.

export class DynamicFieldsetRowElement extends UIElement<any> {
    public constructor(id: string) {
        super(id);

        this.applyPlugins(DynamicFieldsetRowElement);
    }

    public override render(props?: UiElementRenderProps): React.ReactNode {
        return super.render(props);
        /**
         * TODO @ts-refactor @pavel
         * Why was this left here?
         */
        // return <DynamicFieldsetRow>{}</DynamicFieldsetRow>;
    }
}
