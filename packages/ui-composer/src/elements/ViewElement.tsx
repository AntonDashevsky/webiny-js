import React from "react";
import type { UIElementConfig } from "~/UIElement";
import { UIElement } from "~/UIElement";
import type { UIView } from "~/UIView";
import { UIViewComponent } from "~/UIView";

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
