import { Boxes } from "~/BaseEditor/hooks/Boxes";

type HoverCallback = (id: string | null) => void;

/**
 * Determine which box the mouse is hovering, accounting for visual depth.
 */
export class HoverManager {
    private hoveredId: string | null = null;
    private callbacks = new Set<HoverCallback>();
    private running = false;
    private margin = 3;

    constructor(private mouse: { x: number; y: number }, private getAllBoxes: () => Boxes) {}

    onHoverChange(cb: HoverCallback): () => void {
        this.callbacks.add(cb);
        if (!this.running) this.start();

        return () => {
            this.callbacks.delete(cb);
            if (this.callbacks.size === 0) this.stop();
        };
    }

    private notify(id: string | null) {
        if (id !== this.hoveredId) {
            this.hoveredId = id;
            this.callbacks.forEach(cb => cb(id));
        }
    }

    private start() {
        this.running = true;

        const loop = () => {
            const boxes = this.getAllBoxes();
            const { x, y } = this.mouse;

            const hovered = boxes.filter(box => {
                const right = box.left + box.width;
                const bottom = box.top + box.height;

                return (
                    x >= box.left - this.margin &&
                    x <= right + this.margin &&
                    y >= box.top - this.margin &&
                    y <= bottom + this.margin
                );
            });

            // highest depth wins
            const highestBox = Array.from(hovered.entries()).sort(
                ([, a], [, b]) => (b.depth ?? 0) - (a.depth ?? 0)
            )[0];

            this.notify(highestBox ? highestBox[0] : null);

            if (this.running) {
                requestAnimationFrame(loop);
            }
        };

        requestAnimationFrame(loop);
    }

    private stop() {
        this.running = false;
        this.notify(null);
    }
}
