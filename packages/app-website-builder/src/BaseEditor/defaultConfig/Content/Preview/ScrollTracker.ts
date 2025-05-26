type ScrollCallback = (event: WheelEvent) => void;
type ScrollFilter = (event: WheelEvent) => boolean;

export class ScrollTracker {
    private callbacks = new Set<ScrollCallback>();
    private scrollEvent: WheelEvent | null = null;
    private frameId: number | null = null;
    private isTracking = false;

    constructor(private window: Window, private filter: ScrollFilter = () => true) {}

    onChange(cb: ScrollCallback) {
        this.callbacks.add(cb);

        return () => {
            this.callbacks.delete(cb);
        };
    }

    start() {
        if (this.isTracking) {
            return;
        }

        this.window.addEventListener("wheel", this.onScroll, { passive: true });
        this.isTracking = true;
    }

    stop() {
        this.isTracking = false;
        this.window.removeEventListener("wheel", this.onScroll);
    }

    private onScroll = (e: Event) => {
        this.scrollEvent = e as WheelEvent;
        if (this.frameId === null) {
            this.frameId = this.window.requestAnimationFrame(this.tick);
        }
    };

    private tick = () => {
        this.frameId = null;

        if (!this.scrollEvent) {
            return;
        }

        if (this.filter(this.scrollEvent)) {
            for (const cb of this.callbacks) {
                cb(this.scrollEvent);
            }
        }

        this.scrollEvent = null;
    };
}
