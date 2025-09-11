import type React from "react";
import type { UiElementRenderProps } from "~/UIElement.js";
import { UIElement } from "~/UIElement.js";

interface Renderer<TRenderProps> {
    (props: TRenderProps): React.ReactNode;
}

export class GenericElement<
    TRenderProps extends UiElementRenderProps = UiElementRenderProps
> extends UIElement {
    private readonly _render?: Renderer<TRenderProps>;

    constructor(id: string, render?: Renderer<TRenderProps>) {
        super(id);
        this.useGrid(false);

        this._render = render;
    }
    public override render(props: TRenderProps): React.ReactNode {
        return typeof this._render === "function" ? this._render(props) : super.render(props);
    }
}
