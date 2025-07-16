"use client";
import type { ComponentGroup, IContentSdk, PublicPage } from "./types.js";
import { Messenger, MessageOrigin } from "./messenger";
import { logger } from "./Logger";
import { PreviewViewport } from "./PreviewViewport";
import { ViewportManager } from "./ViewportManager";
import { componentRegistry } from "./ComponentRegistry";
import { mouseTracker } from "./MouseTracker";
import { functionConverter } from "./FunctionConverter";
import { documentStoreManager } from "~/sdk/DocumentStoreManager";
import { DocumentStore } from "~/sdk/DocumentStore";
import { HotkeyManager } from "~/sdk/HotkeyManager";
import { PreviewDocument } from "./PreviewDocument.js";

export class EditingSdk implements IContentSdk {
    public readonly messenger: Messenger;
    private positionReportingEnabled = false;
    private previewViewport: PreviewViewport | null = null;
    private liveSdk: IContentSdk;
    private documentStore: DocumentStore<PublicPage>;
    private previewDocument: PreviewDocument;
    private hotkeyManager: HotkeyManager;

    constructor(liveSdk: IContentSdk) {
        this.liveSdk = liveSdk;
        const source = new MessageOrigin(() => window, window.location.origin);
        const target = new MessageOrigin(() => window.parent, this.getReferrerOrigin());

        this.previewDocument = PreviewDocument.createFromWindow();

        this.documentStore = documentStoreManager.getStore<PublicPage>(
            this.previewDocument.getId()
        );

        this.messenger = new Messenger(source, target, "wb.editor.*");

        this.hotkeyManager = new HotkeyManager();

        componentRegistry.onRegister(reg => {
            this.messenger.send("preview.component.register", reg.component.manifest);
        });

        this.setupListeners();

        this.messenger.send("preview.ready", true);

        this.disableLinks();

        this.setupHotkeyListeners();
    }

    public async getPage(path: string): Promise<PublicPage | null> {
        if (!this.previewDocument.matches({ type: "page", path })) {
            return this.liveSdk.getPage(path);
        }

        await this.documentStore.waitForDocument();
        return this.documentStore.getDocument();
    }

    public async listPages(): Promise<PublicPage[]> {
        return this.liveSdk.listPages();
    }

    registerComponentGroup(group: ComponentGroup) {
        this.messenger.send("preview.componentGroup.register", {
            ...group,
            filter: group.filter ? functionConverter.serialize(group.filter) : undefined
        });
    }

    refreshOverlays() {
        this.reportBoxes();
    }

    private getReferrerOrigin(): string {
        try {
            const searchParams = new URLSearchParams(window.location.search);
            return searchParams.get("wb.referrer")!;
        } catch {
            return "";
        }
    }

    private setupListeners() {
        if (!this.messenger) {
            return;
        }

        this.messenger.on("document.set", data => {
            this.documentStore.setDocument(data);

            if (!this.positionReportingEnabled) {
                // Initialize position reporting
                this.initPositionReporting();
            } else {
                setTimeout(() => this.reportBoxes(), 20);
            }
        });

        this.messenger.on("element.set", data => {
            this.documentStore.updateElement(data.id, data.patch);
            setTimeout(() => {
                this.reportBoxes();
            }, 50);
        });

        this.messenger.on("document.patch", patch => {
            this.documentStore.applyPatch(patch);
            setTimeout(() => {
                this.reportBoxes();
            }, 50);
        });

        this.messenger.on("preview.element.positions.get", () => {
            this.reportBoxes();
        });

        this.messenger.on("preview.scroll", data => {
            window.scrollBy(data.deltaX, data.deltaY);
        });

        this.messenger.on("element.patch.*", () => {
            setTimeout(() => {
                this.reportBoxes();
            }, 50);
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
                setTimeout(() => {
                    this.reportBoxes();
                }, 50);
            }
        });

        mouseTracker.start();
        mouseTracker.subscribe(position => {
            this.messenger.send("preview.mouse.move", position);
        });

        // Enable position reporting by default
        this.positionReportingEnabled = true;

        // Report initial positions after a short delay to ensure elements are rendered
        setTimeout(() => this.reportBoxes(), 500);
    }

    private reportBoxes(): void {
        if (!this.messenger || !this.previewViewport) {
            logger.warn("No messenger or preview viewport. Skipping position reporting.");
            return;
        }

        // Send positions to the editor
        this.messenger.send("preview.viewport", {
            boxes: this.previewViewport.getVisibleBoxes(),
            viewport: this.previewViewport.getViewport()
        });
    }

    private disableLinks() {
        // Intercept link clicks when we're in the editing mode (loaded via iframe from the editor).
        document.addEventListener(
            "click",
            event => {
                const target = event.target as HTMLElement;

                // Check if the clicked element or any of its ancestors is a link
                const anchor = target.closest("a");

                if (anchor && anchor.href) {
                    event.preventDefault();
                    event.stopPropagation();
                }
            },
            // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#usecapture
            true
        );
    }

    private setupHotkeyListeners() {
        this.hotkeyManager.add("escape", e => {
            e.preventDefault();
            this.messenger.send("preview.escape");
        });

        this.hotkeyManager.add("mod+z", e => {
            e.preventDefault();
            this.messenger.send("preview.undo");
        });

        this.hotkeyManager.add("mod+shift+z", e => {
            e.preventDefault();
            this.messenger.send("preview.redo");
        });
    }
}
