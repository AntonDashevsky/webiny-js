import { ComponentResolver } from "./ComponentResolver.js";
import { documentStore } from "./DocumentStore.js";
import type {
    Component,
    ComponentGroup,
    DocumentElement,
    IContentSdk,
    Page,
    ResolvedComponent
} from "./types.js";
import { Messenger, MessageOrigin } from "./messenger";
import { logger } from "./Logger";
import { PreviewViewport } from "./PreviewViewport";
import { ViewportManager } from "./ViewportManager";
import { componentRegistry } from "./ComponentRegistry";
import { PreviewMouseReporter } from "./PreviewMouseReporter";
import { functionConverter } from "./FunctionConverter";

export class PreviewSdk implements IContentSdk {
    public readonly messenger: Messenger;
    private positionReportingEnabled = false;
    private previewViewport: PreviewViewport | null = null;
    private mouseReporter: PreviewMouseReporter;

    constructor() {
        const source = new MessageOrigin(window, window.location.origin);
        const target = new MessageOrigin(window.parent, this.getReferrerOrigin());

        this.messenger = new Messenger(source, target, "wb.editor.*");
        this.mouseReporter = new PreviewMouseReporter(window);

        componentRegistry.onRegister(reg => {
            this.messenger.send("preview.component.register", reg.component.manifest);
        });
    }

    public init(): void {
        logger.info("Preview SDK initialized!");

        this.setupListeners();

        this.messenger.send("preview.ready", true);
    }

    public async getPage(): Promise<Page | null> {
        await documentStore.waitForDocument();
        return documentStore.getDocument();
    }

    public async listPages(): Promise<Page[]> {
        return [];
    }

    registerComponent(component: Component): void {
        componentRegistry.register(component);
    }

    registerComponentGroup(group: ComponentGroup) {
        this.messenger.send("preview.componentGroup.register", {
            ...group,
            filter: group.filter ? functionConverter.serialize(group.filter) : undefined
        });
    }

    resolveElement(element: DocumentElement): ResolvedComponent | null {
        return new ComponentResolver(componentRegistry).resolve(element);
    }

    private getReferrerOrigin(): string {
        try {
            const referrer = new URL(document.referrer);
            return `${referrer.protocol}//${referrer.host}`;
        } catch {
            return "";
        }
    }

    private setupListeners() {
        if (!this.messenger) {
            return;
        }

        this.messenger.on("document.set", data => {
            documentStore.setDocument(data);

            if (!this.positionReportingEnabled) {
                // Initialize position reporting
                this.initPositionReporting();
            } else {
                setTimeout(() => this.reportBoxes(), 20);
            }
        });

        this.messenger.on("element.set", data => {
            documentStore.updateElement(data.id, data.patch);
            setTimeout(() => {
                this.reportBoxes();
            }, 20);
        });

        this.messenger.on("document.patch", patch => {
            documentStore.applyPatch(patch);
            setTimeout(() => {
                this.reportBoxes();
            }, 20);
        });

        this.messenger.on("preview.element.positions.get", () => {
            this.reportBoxes();
        });

        this.messenger.on("preview.scroll", data => {
            window.scrollBy(data.deltaX, data.deltaY);
        });
    }

    private initPositionReporting(): void {
        if (this.positionReportingEnabled) {
            return;
        }

        // Initialize element positions tracker
        this.previewViewport = new PreviewViewport();

        // Add event listeners
        const viewportManager = new ViewportManager();

        viewportManager.onViewportChangeStart(() => {
            if (this.messenger) {
                this.messenger.send("preview.viewport.change.start");
            }
        });

        viewportManager.onViewportChangeEnd(() => {
            if (this.messenger) {
                this.messenger.send("preview.viewport.change.end");
                this.reportBoxes();
            }
        });

        this.mouseReporter.subscribe((x, y) => {
            this.messenger.send("preview.mouse.move", { x, y });
        });

        // Enable position reporting by default
        this.positionReportingEnabled = true;

        // Report initial positions after a short delay to ensure elements are rendered
        setTimeout(() => this.reportBoxes(), 500);
    }

    private reportBoxes(): void {
        if (!this.messenger || !this.previewViewport) {
            return;
        }

        // Send positions to the editor
        this.messenger.send("preview.viewport", {
            boxes: this.previewViewport.getBoxes(),
            viewport: this.previewViewport.getViewport()
        });
    }
}
