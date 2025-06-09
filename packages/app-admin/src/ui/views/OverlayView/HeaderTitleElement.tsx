import React from "react";
import { UIElement, type UIElementConfig } from "~/ui/UIElement.js";
import { Typography } from "@webiny/ui/Typography/index.js";
import { UIRenderer, type UIRenderParams } from "~/ui/UIRenderer.js";

interface HeaderTitleElementConfig extends UIElementConfig {
    title: () => string | null;
}

export class HeaderTitleElementRenderer extends UIRenderer<HeaderTitleElement> {
    public override render({ element }: UIRenderParams<HeaderTitleElement>): React.ReactNode {
        return (
            <Typography
                style={{ margin: "0 auto", color: "var(--mdc-theme-on-surface)" }}
                use={"headline6"}
            >
                {element.config.title()}
            </Typography>
        );
    }
}

export class HeaderTitleElement extends UIElement<HeaderTitleElementConfig> {
    public constructor(id: string, config: HeaderTitleElementConfig) {
        super(id, config);

        this.addRenderer(new HeaderTitleElementRenderer());
    }
}
