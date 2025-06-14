"use client";
import { makeAutoObservable, observable, runInAction, toJS } from "mobx";
import { contentSdk, DocumentStore, type PreviewSdk, viewportManager } from "~/sdk/index.js";
import type { DocumentElement } from "~/sdk/types.js";
import { resizeObserver } from "~/sdk/ResizeObserver";
import { setObservablePath } from "~/sdk/setObservablePath";

export class PreviewElementRendererPresenter {
    private element: DocumentElement;
    private listeners: Array<() => void> = [];
    private documentStore: DocumentStore;
    private readonly preview: PreviewSdk;
    private displayMode: string;
    private viewportListenerDispose: (() => void) | undefined;

    constructor(documentStore: DocumentStore) {
        this.documentStore = documentStore;
        this.element = observable({}) as DocumentElement;
        this.preview = contentSdk.preview!;
        this.displayMode = viewportManager.getViewport().displayMode;
        this.viewportListenerDispose = viewportManager.onViewportChangeEnd(viewport => {
            this.displayMode = viewport.displayMode;
        });
        makeAutoObservable(this);
    }

    get vm() {
        return {
            element: toJS(this.element)
        };
    }

    init(element: DocumentElement) {
        this.element = element;
        this.setupPreview();
    }

    observeDOM() {
        const element = document.querySelector(`[data-element-id="${this.element.id}"]`);
        if (element) {
            resizeObserver.observe(element as HTMLElement);
        }
    }

    dispose() {
        const element = document.querySelector(`[data-element-id="${this.element.id}"]`);
        if (element) {
            resizeObserver.unobserve(element as HTMLElement);
        }

        if (this.viewportListenerDispose) {
            this.viewportListenerDispose();
        }

        this.listeners.forEach(fn => fn());
    }

    onMouseEnter = () => {
        this.preview.messenger.send("preview.element.enter", { id: this.element!.id });
    };

    private setupPreview() {
        const element = this.element;

        if (!element) {
            return;
        }

        const { id } = element;

        this.listeners.push(
            this.preview.messenger.on(`element.patch.${id}`, ({ inputs = {}, styles = {} }) => {
                this.documentStore.updateDocument(document => {
                    // Apply inputs
                    Object.keys(inputs).forEach(inputName => {
                        // TODO: See if simple `lodash/set` can work here
                        setObservablePath(
                            document.bindings,
                            `${id}.inputs.${inputName}.static`,
                            inputs[inputName]
                        );
                    });

                    // Apply styles
                    Object.keys(styles).forEach(propertyName => {
                        setObservablePath(
                            document.bindings,
                            `${id}.styles.${this.displayMode}.${propertyName}.static`,
                            styles[propertyName]
                        );
                    });
                });
            })
        );
    }
}
