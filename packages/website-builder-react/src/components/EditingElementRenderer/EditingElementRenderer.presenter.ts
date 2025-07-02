"use client";
import { makeAutoObservable, observable, toJS } from "mobx";
import {
    contentSdk,
    resizeObserver,
    jsonPatch,
    DocumentStore,
    type EditingSdk,
    type DocumentElement,
} from "@webiny/app-website-builder/sdk";

export class EditingElementRendererPresenter {
    private element: DocumentElement;
    private listeners: Array<() => void> = [];
    private documentStore: DocumentStore;
    private readonly editingSdk: EditingSdk | undefined;

    constructor(documentStore: DocumentStore) {
        this.documentStore = documentStore;
        this.element = observable({}) as DocumentElement;
        this.editingSdk = contentSdk.getEditingSdk();
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

        if (this.editingSdk) {
            this.listeners.push(
                this.editingSdk.messenger.on(`element.patch.${id}`, patch => {
                    this.documentStore.updateDocument(document => {
                        jsonPatch.applyPatch(document.bindings[id], patch, false, true);
                    });
                })
            );
        }
    }
}
