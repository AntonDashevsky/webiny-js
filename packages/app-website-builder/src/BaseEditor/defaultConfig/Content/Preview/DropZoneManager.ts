import { Box } from "./Box";

type DropPosition = number | null;

export interface DropZoneProximity {
    box: Box;
    position: DropPosition;
}

interface DropzoneEntry {
    id: string;
    box: Box;
    onProximityChange: (proximity: DropZoneProximity | null) => void;
}

export class DropZoneManager {
    private zones = new Map<string, DropzoneEntry>();
    private currentTargetId: string | null = null;
    private currentPosition: DropPosition = null;
    private animationFrame: number | null = null;
    private currentBox: Box | null = null;

    constructor(private mouse: { x: number; y: number }) {}

    register(entry: DropzoneEntry) {
        if (entry.id === "root") {
            return;
        }

        this.zones.set(entry.id, entry);
    }

    unregister(id: string) {
        this.zones.delete(id);
    }

    start() {
        const runDropzoneLoop = () => {
            this.tick();
            this.animationFrame = requestAnimationFrame(runDropzoneLoop);
        };
        this.animationFrame = requestAnimationFrame(runDropzoneLoop);
    }

    stop() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }

    getLastMatchedPosition() {
        if (!this.currentBox) {
            return null;
        }

        return {
            parentId: this.currentBox.parentId,
            slot: this.currentBox.parentSlot,
            index: this.currentBox.parentIndex + (this.currentPosition ?? 0)
        };
    }

    tick() {
        let matchedId: string | null = null;
        let matchedPosition: DropPosition = null;
        let matchedBox: Box | null = null;

        for (const [id, { box }] of this.zones) {
            const y = this.mouse.y;
            const threshold = 10;

            if (y >= box.top - threshold && y <= box.top + threshold) {
                matchedId = id;
                // `0` means `before`
                matchedPosition = 0;
                matchedBox = box;
                break;
            }

            if (y >= box.bottom - threshold && y <= box.bottom + threshold) {
                matchedId = id;
                // `1` means `after`
                matchedPosition = 1;
                matchedBox = box;
                break;
            }
        }

        // Only notify if changed
        if (matchedId !== this.currentTargetId || matchedPosition !== this.currentPosition) {
            this.currentTargetId = matchedId;
            this.currentPosition = matchedPosition;
            this.currentBox = matchedBox;

            for (const [id, entry] of this.zones) {
                const isTarget = id === matchedId;
                entry.onProximityChange(
                    isTarget ? { box: matchedBox!, position: matchedPosition } : null
                );
            }
        }
    }
}
