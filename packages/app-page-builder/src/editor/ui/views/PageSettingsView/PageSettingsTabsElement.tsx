import { UIElement } from "@webiny/app-admin/ui/UIElement.js";
import { PageSettingsTabsElementRenderer } from "./PageSettingsTabsElementRenderer.js";

export class PageSettingsTabsElement extends UIElement {
    public constructor(id: string) {
        super(id);

        this.useGrid(false);
        this.addRenderer(new PageSettingsTabsElementRenderer());
    }
}
