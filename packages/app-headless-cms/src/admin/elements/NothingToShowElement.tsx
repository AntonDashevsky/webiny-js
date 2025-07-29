import React from "react";
import { css } from "@emotion/css";
import { NavigationMenuElement } from "@webiny/app-admin/ui/elements/NavigationMenuElement";
import type { UIElementConfig } from "@webiny/app-admin/ui/UIElement";
import { List, ListItem } from "@webiny/ui/List";
import type { UIRenderParams } from "@webiny/app-admin/ui/UIRenderer";
import { UIRenderer } from "@webiny/app-admin/ui/UIRenderer";

const linkStyle = css({
    color: "var(--mdc-theme-text-primary-on-background)",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "100%",
    outline: "none",
    paddingLeft: 65,
    "&:hover": {
        textDecoration: "none"
    }
});

const submenuItems = css({
    ".mdc-drawer &.mdc-deprecated-list-item": {
        paddingLeft: 0
    }
});

const submenuList = css({
    "&.mdc-deprecated-list": {
        padding: 0
    }
});

interface NothingToShowElementConfig extends UIElementConfig {
    label: string;
}

export class NothingToShowElement extends NavigationMenuElement {
    constructor(id: string, config: NothingToShowElementConfig) {
        super(id, config);

        this.addRenderer(new NothingToShowRenderer());
    }
}

export class NothingToShowRenderer extends UIRenderer<NavigationMenuElement> {
    public override canRender(element: NavigationMenuElement): boolean {
        return element instanceof NothingToShowElement;
    }

    public render({ element }: UIRenderParams<NavigationMenuElement>): React.ReactNode {
        return (
            <List className={submenuList} style={{ opacity: 0.4 }}>
                <ListItem className={submenuItems} ripple={false} disabled>
                    <span className={linkStyle}>{element.config.label}</span>
                </ListItem>
            </List>
        );
    }
}
