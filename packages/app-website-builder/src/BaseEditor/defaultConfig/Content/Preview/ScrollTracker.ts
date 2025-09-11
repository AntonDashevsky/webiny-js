type ScrollFilter = (event: WheelEvent) => boolean;
type ScrollHandler = (event: WheelEvent) => void;

export class ScrollTracker {
    private readonly changeTimeout: number;
    private readonly scrollStartSubscribers: Set<ScrollHandler>;
    private readonly scrollSubscribers: Set<ScrollHandler>;
    private readonly scrollEndSubscribers: Set<ScrollHandler>;
    private isChanging: boolean;
    private changeTimer: number | null;
    private filter: ScrollFilter;
    private window: Window;

    constructor(window: Window, filter: ScrollFilter = () => true) {
        this.window = window;
        this.filter = filter;
        this.changeTimeout = 150;
        this.scrollStartSubscribers = new Set();
        this.scrollSubscribers = new Set();
        this.scrollEndSubscribers = new Set();
        this.isChanging = false;
        this.changeTimer = null;
    }

    public onScrollStart(callback: ScrollHandler): () => void {
        this.scrollStartSubscribers.add(callback);
        return () => this.scrollStartSubscribers.delete(callback);
    }

    public onScroll(callback: ScrollHandler): () => void {
        this.scrollSubscribers.add(callback);
        return () => this.scrollSubscribers.delete(callback);
    }

    public onScrollEnd(callback: ScrollHandler): () => void {
        this.scrollEndSubscribers.add(callback);
        return () => this.scrollEndSubscribers.delete(callback);
    }

    public start() {
        this.window.addEventListener("wheel", this.handleScroll, { passive: true });
    }

    public destroy(): void {
        this.window.removeEventListener("wheel", this.handleScroll);

        if (this.changeTimer !== null) {
            clearTimeout(this.changeTimer);
        }
        this.scrollStartSubscribers.clear();
        this.scrollSubscribers.clear();
        this.scrollEndSubscribers.clear();
    }

    private handleScroll = (e: Event): void => {
        const scrollEvent = e as WheelEvent;
        const isValidSource = this.filter(scrollEvent);

        if (this.changeTimer !== null) {
            clearTimeout(this.changeTimer);
        }

        if (!this.isChanging) {
            if (isValidSource) {
                this.isChanging = true;
                this.notifySubscribers(this.scrollStartSubscribers, scrollEvent);
            }
        }

        if (this.isChanging && isValidSource) {
            this.notifySubscribers(this.scrollSubscribers, scrollEvent);
        }

        this.changeTimer = window.setTimeout(() => {
            this.isChanging = false;
            this.notifySubscribers(this.scrollEndSubscribers, scrollEvent);
        }, this.changeTimeout);
    };

    private notifySubscribers(subscribers: Set<ScrollHandler>, event: WheelEvent): void {
        subscribers.forEach(callback => {
            if (typeof callback === "function") {
                callback(event);
            }
        });
    }
}
