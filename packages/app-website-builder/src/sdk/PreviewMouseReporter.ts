type MouseMoveCallback = (x: number, y: number) => void;

export class PreviewMouseReporter {
    private latest: { x: number; y: number } | null = null;
    private lastSent: { x: number; y: number } | null = null;
    private frameId: number | null = null;
    private callbacks = new Set<MouseMoveCallback>();
    private listener: ((e: MouseEvent) => void) | null = null;
    private window: Window;

    constructor(window: Window) {
        this.window = window;
        this.start();
    }

    start() {
        if (this.listener) {
            return;
        }

        this.listener = (e: MouseEvent) => {
            this.latest = { x: e.clientX, y: e.clientY };
        };

        this.window.addEventListener("mousemove", this.listener);

        const loop = () => {
            if (this.latest) {
                const { x, y } = this.latest;
                if (!this.lastSent || x !== this.lastSent.x || y !== this.lastSent.y) {
                    for (const cb of this.callbacks) {
                        cb(x, y);
                    }
                    this.lastSent = { x, y };
                }
            }

            this.frameId = this.window.requestAnimationFrame(loop);
        };

        this.frameId = this.window.requestAnimationFrame(loop);
    }

    stop() {
        if (this.listener) {
            this.window.removeEventListener("mousemove", this.listener);
            this.listener = null;
        }

        if (this.frameId !== null) {
            this.window.cancelAnimationFrame(this.frameId);
            this.frameId = null;
        }

        this.latest = null;
        this.lastSent = null;
    }

    subscribe(callback: MouseMoveCallback): () => void {
        this.callbacks.add(callback);
        return () => this.callbacks.delete(callback);
    }
}
