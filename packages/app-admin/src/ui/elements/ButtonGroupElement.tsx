import React from "react";

import type { UiElementRenderProps } from "~/ui/UIElement.js";
import { UIElement } from "~/ui/UIElement.js";
import styled from "@emotion/styled";

const ButtonGroup = styled("div")({
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    "> button": {
        marginRight: 15
    }
});

export class ButtonGroupElement extends UIElement<any> {
    public constructor(id: string) {
        super(id);

        this.useGrid(false);
    }

    public override render(props?: UiElementRenderProps): React.ReactNode {
        return <ButtonGroup>{super.render(props)}</ButtonGroup>;
    }
}
