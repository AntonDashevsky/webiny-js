import React from "react";
import type { UIElementConfig } from "~/UIElement.js";
import { UIElement } from "~/UIElement.js";
import type { UIView } from "~/UIView.js";
import { UIViewComponent } from "~/UIView.js";

interface ViewElementConfig extends UIElementConfig {
    view: UIView;
}

export class ViewElement extends UIElement<ViewElementConfig> {
    constructor(id: string, config: ViewElementConfig) {
        super(id, config);
        config.view.setParent(this);
    }

    public override getChildren(): UIElement[] {
        return this.config.view.getChildren();
    }

    public override getDescendentsByType<TElement extends UIElement = UIElement>(
        type: any
    ): TElement[] {
        return this.config.view.getDescendentsByType(type) as TElement[];
    }

    public override render(props?: any): React.ReactNode {
        if (!this.config.view) {
            return null;
        }

        return <UIViewComponent {...props} view={this.config.view} />;
    }
}
