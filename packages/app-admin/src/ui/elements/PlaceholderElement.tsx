import { UIElement } from "../UIElement.js";

export class PlaceholderElement extends UIElement {
    public override render(): React.ReactNode {
        return null;
    }

    public override remove(): void {
        return;
    }
}
