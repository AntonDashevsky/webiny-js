import { ElementBoxData, ElementSlotBoxData } from "~/sdk/types.js";
import { ViewportManager } from "./ViewportManager";

export class PreviewViewport {
    private viewportManager: ViewportManager | null = null;

    constructor() {
        this.viewportManager = new ViewportManager();
    }

    getBoxes() {
        const elementBoxes: Record<string, ElementBoxData> = {};

        // Collect positions for all elements
        const elements = document.querySelectorAll("[data-element-id]");

        elements.forEach(element => {
            const id = element.getAttribute("data-element-id");
            const depth = element.getAttribute("data-depth");
            if (id) {
                // Get the bounding box relative to the viewport
                const rect = element.getBoundingClientRect();

                // Convert DOMRect to a plain object to ensure it can be serialized
                elementBoxes[id] = {
                    type: "element",
                    depth: parseInt(depth ?? "0"),
                    parentId: element.getAttribute("data-parent-id")!,
                    parentSlot: element.getAttribute("data-parent-slot")!,
                    parentIndex: parseInt(element.getAttribute("data-parent-index") ?? "0"),
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height
                };
            }
        });

        // Collect positions for all element slots
        const slotBoxes: Record<string, ElementSlotBoxData> = {};

        const elementSlots = document.querySelectorAll("[data-role='element-slot']");

        elementSlots.forEach(element => {
            const parentId = element.getAttribute("data-parent-id");
            const slot = element.getAttribute("data-parent-slot");
            const depth = element.getAttribute("data-depth");

            // Get the bounding box relative to the viewport
            const rect = element.getBoundingClientRect();

            // Convert DOMRect to a plain object to ensure it can be serialized
            slotBoxes[`${parentId}:${slot}`] = {
                type: "element-slot",
                depth: parseInt(depth ?? "0"),
                parentId: element.getAttribute("data-parent-id")!,
                parentSlot: element.getAttribute("data-parent-slot")!,
                parentIndex: parseInt(element.getAttribute("data-parent-index") ?? "0"),
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height
            };
        });

        return { ...elementBoxes, ...slotBoxes };
    }

    getViewport() {
        const viewport = this.viewportManager
            ? this.viewportManager.getViewport()
            : {
                  width: window.innerWidth,
                  height: window.innerHeight,
                  scrollX: window.scrollX,
                  scrollY: window.scrollY
              };

        return viewport;
    }

    destroy(): void {
        if (this.viewportManager) {
            this.viewportManager.destroy();
            this.viewportManager = null;
        }
    }
}
