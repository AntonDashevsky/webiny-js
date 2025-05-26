interface PositionCallback {
    (params: { x: number; y: number }): void;
}

export class MousePositionTracker {
    private mouseX = 0;
    private mouseY = 0;
    private isTracking = false;
    private callbacks = new Set<PositionCallback>();
    private window: Window;

    constructor(window: Window) {
        this.window = window;
    }

    onChange(cb: PositionCallback) {
        this.callbacks.add(cb);

        return () => {
            this.callbacks.delete(cb);
        };
    }

    start() {
        if (this.isTracking) {
            return;
        }

        this.window.addEventListener("mousemove", this.updateMousePosition);
        this.isTracking = true;
    }

    stop() {
        this.isTracking = false;
        this.window.removeEventListener("mousemove", this.updateMousePosition);
    }

    get x() {
        return this.mouseX;
    }

    get y() {
        return this.mouseY;
    }

    setPosition(x: number, y: number) {
        this.mouseX = x;
        this.mouseY = y;

        this.callbacks.forEach(cb => cb({ x, y }));
    }

    private updateMousePosition = (e: MouseEvent) => {
        this.setPosition(e.clientX, e.clientY);
    };
}

export const mousePositionTracker = new MousePositionTracker(window);
