"use client";
import { makeAutoObservable, observable, toJS } from "mobx";
import * as fjp from "fast-json-patch";
import { contentSdk, DocumentStore, type PreviewSdk } from "~/sdk/index.js";
import type { DocumentElement } from "~/sdk/types.js";
import { resizeObserver } from "~/sdk/ResizeObserver";

export class PreviewElementRendererPresenter {
    private element: DocumentElement;
    private listeners: Array<() => void> = [];
    private documentStore: DocumentStore;
    private readonly preview: PreviewSdk;

    constructor(documentStore: DocumentStore) {
        this.documentStore = documentStore;
        this.element = observable({}) as DocumentElement;
        this.preview = contentSdk.preview!;
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

        this.listeners.forEach(fn => fn());
    }

    private setupPreview() {
        const element = this.element;

        if (!element) {
            return;
        }

        const { id } = element;

        this.listeners.push(
            this.preview.messenger.on(`element.patch.${id}`, patch => {
                this.documentStore.updateDocument(document => {
                    console.log("patch", id, patch);
                    fjp.applyPatch(document.bindings[id], patch, false, true);
                });
            })
        );
    }
}
