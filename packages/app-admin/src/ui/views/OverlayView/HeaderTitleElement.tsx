import React from "react";
import type { UIElementConfig } from "~/ui/UIElement";
import { UIElement } from "~/ui/UIElement";
import { Typography } from "@webiny/ui/Typography";
import type { UIRenderParams } from "~/ui/UIRenderer";
import { UIRenderer } from "~/ui/UIRenderer";

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
