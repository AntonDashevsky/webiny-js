import React from "react";
import { UIElement } from "~/ui/UIElement.js";
import { TopAppBarPrimary, TopAppBarTitle } from "@webiny/ui/TopAppBar/index.js";
import { GenericElement } from "~/ui/elements/GenericElement.js";
import { PlaceholderElement } from "~/ui/elements/PlaceholderElement.js";
import { HeaderSectionLeftElement } from "./HeaderSectionLeftElement.js";
import { HeaderSectionCenterElement } from "./HeaderSectionCenterElement.js";
import { HeaderSectionRightElement } from "./HeaderSectionRightElement.js";
import Hamburger from "./components/Hamburger.js";
import { UIRenderer, type UIRenderParams } from "~/ui/UIRenderer.js";

enum ElementID {
    MenuButton = "headerMenuButton",
    Logo = "headerLogo"
}

class HeaderElementRenderer extends UIRenderer<HeaderElement> {
    public override render({ next }: UIRenderParams<HeaderElement>): React.ReactNode {
        return <TopAppBarPrimary fixed>{next()}</TopAppBarPrimary>;
    }
}

export class HeaderElement extends UIElement {
    public constructor(id: string) {
        super(id);

        this.useGrid(false);

        const leftSection = this.addElement(new HeaderSectionLeftElement("headerLeft"));
        leftSection.addElement(new PlaceholderElement(ElementID.MenuButton));
        leftSection.addElement(new PlaceholderElement(ElementID.Logo));

        this.addElement(new HeaderSectionCenterElement("headerCenter"));
        this.addElement(new HeaderSectionRightElement("headerRight"));

        this.addRenderer(new HeaderElementRenderer());

        this.setMenuButton(<Hamburger />);
        this.applyPlugins(HeaderElement);
    }

    public getLeftSection(): HeaderSectionLeftElement {
        return this.getElement("headerLeft") as HeaderSectionLeftElement;
    }

    public getCenterSection(): HeaderSectionCenterElement {
        return this.getElement("headerCenter") as HeaderSectionCenterElement;
    }

    public getRightSection(): HeaderSectionRightElement {
        return this.getElement("headerRight") as HeaderSectionRightElement;
    }

    public setLogo(logo: React.ReactElement): void {
        // TODO: extract into a `LogoElement` class
        const element = this.getElement(ElementID.Logo);
        if (!element) {
            return;
        }
        element.replaceWith(
            new GenericElement(ElementID.Logo, () => {
                return <TopAppBarTitle>{logo}</TopAppBarTitle>;
            })
        );
    }

    public setMenuButton(menuButton: React.ReactElement): void {
        const button = this.getElement(ElementID.MenuButton);
        if (!button) {
            return;
        }
        button.replaceWith(
            new GenericElement(ElementID.MenuButton, () => {
                return menuButton;
            })
        );
    }
}
