import React from "react";
import { css } from "emotion";
import type { UiElementRenderProps } from "~/ui/UIElement.js";
import { UIElement } from "~/ui/UIElement.js";
import { TopAppBarSection } from "@webiny/ui/TopAppBar/index.js";

const middleBar = css({
    width: "50%"
});

export class HeaderSectionCenterElement extends UIElement {
    public constructor(id: string) {
        super(id);

        this.useGrid(false);
    }

    public override render(props: UiElementRenderProps): React.ReactNode {
        return (
            <TopAppBarSection className={middleBar} alignEnd>
                {super.render(props)}
            </TopAppBarSection>
        );
    }
}
