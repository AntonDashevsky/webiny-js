import { UIElement } from "~/ui/UIElement.js";
import { EmptyStateElementRenderer } from "./EmptyStateElementRenderer.js";

export class EmptyStateElement extends UIElement<any> {
    public constructor(id: string) {
        super(id);

        this.addRenderer(new EmptyStateElementRenderer());
    }
}
