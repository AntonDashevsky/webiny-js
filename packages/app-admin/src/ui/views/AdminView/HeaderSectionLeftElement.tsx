import React from "react";
import { css } from "emotion";
import { UIElement, type UiElementRenderProps } from "~/ui/UIElement.js";
import { TopAppBarSection } from "@webiny/ui/TopAppBar/index.js";

const edgeBars = css({
    width: "25%"
});

export class HeaderSectionLeftElement extends UIElement {
    public constructor(id: string) {
        super(id);

        this.useGrid(false);
    }

    public override render(props: UiElementRenderProps): React.ReactNode {
        return (
            <TopAppBarSection className={edgeBars} alignStart>
                {super.render(props)}
            </TopAppBarSection>
        );
    }
}
