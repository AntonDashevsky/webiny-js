"use client";
import type { ComponentGroup, IContentSdk, PublicPage, PublicRedirect } from "./types.js";
import { Messenger, MessageOrigin } from "./messenger";
import { logger } from "./Logger";
import { PreviewViewport } from "./PreviewViewport";
import { viewportManager } from "./ViewportManager";
import { componentRegistry } from "./ComponentRegistry";
import { functionConverter } from "./FunctionConverter";
import { documentStoreManager } from "~/DocumentStoreManager";
import type { DocumentStore } from "~/DocumentStore";
import { PreviewDocument } from "./PreviewDocument.js";
import { hashObject } from "~/HashObject";
import type { WebsiteBuilderTheme } from "~/types/WebsiteBuilderTheme";

export class EditingSdk implements IContentSdk {
    public readonly messenger: Messenger;
    private positionReportingEnabled = false;
    private previewViewport: PreviewViewport | null = null;
    private liveSdk: IContentSdk;
    private documentStore: DocumentStore<PublicPage>;
    private previewDocument: PreviewDocument;
    private lastBoxesHash = 0;

    constructor(liveSdk: IContentSdk, theme: WebsiteBuilderTheme) {
        this.liveSdk = liveSdk;

        const source = new MessageOrigin(() => window, window.location.origin);
        const target = new MessageOrigin(() => window.parent, this.getReferrerOrigin());

        this.previewDocument = PreviewDocument.createFromWindow();

        this.documentStore = documentStoreManager.getStore<PublicPage>(
            this.previewDocument.getId()
        );

        this.messenger = new Messenger(source, target, "wb.editor.*");

        componentRegistry.onRegister(reg => {
            this.messenger.send("preview.component.register", reg.component.manifest);
        });

        this.setupListeners();

        this.messenger.send("preview.ready", true);

        if (theme) {
            this.messenger.send("preview.theme", { theme });
        }

        this.disableLinks();
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

    public listRedirects(): Promise<PublicRedirect[]> {
        return this.liveSdk.listRedirects();
    }

    registerComponentGroup(group: ComponentGroup) {
        this.messenger.send("preview.componentGroup.register", {
            ...group,
            filter: group.filter ? functionConverter.serialize(group.filter) : undefined
        });
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
            }
        });

        this.messenger.on("element.set", data => {
            this.documentStore.updateElement(data.id, data.patch);
        });

        this.messenger.on("document.patch", patch => {
            this.documentStore.applyPatch(patch);
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
        viewportManager.onViewportChangeStart(() => {
            if (this.messenger) {
                this.messenger.send("preview.viewport.change.start");
            }
        });

        viewportManager.onViewportChangeEnd(() => {
            if (this.messenger) {
                this.messenger.send("preview.viewport.change.end");
            }
        });

        // Enable position reporting by default
        this.positionReportingEnabled = true;

        // Report positions periodically
        setInterval(() => this.reportBoxes(), 300);
    }

    private reportBoxes(): void {
        if (!this.messenger || !this.previewViewport) {
            logger.warn("No messenger or preview viewport. Skipping position reporting.");
            return;
        }

        const newBoxes = this.previewViewport.getVisibleBoxes();
        const hash = hashObject.hash(newBoxes);
        if (hash === this.lastBoxesHash) {
            return;
        }

        this.lastBoxesHash = hash;
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
}
