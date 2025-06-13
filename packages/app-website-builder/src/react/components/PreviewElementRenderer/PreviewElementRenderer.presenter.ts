"use client";
import { autorun, makeAutoObservable, observable, runInAction, toJS } from "mobx";
import { contentSdk, DocumentStore, type PreviewSdk } from "~/sdk/index.js";
import type { DocumentElement } from "~/sdk/types.js";
import { resizeObserver } from "~/sdk/ResizeObserver";

export class PreviewElementRendererPresenter {
    private element: DocumentElement;
    private listeners: Array<() => void> = [];
    private documentStore: DocumentStore;
    private preview: PreviewSdk;

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
            autorun(() => {
                const newData = this.documentStore.getElement(id);

                runInAction(() => {
                    if (!newData) {
                        return;
                    }

                    // Assign all new keys from the incoming object
                    Object.assign(this.element, newData);
                });
            })
        );

        this.listeners.push(
            this.preview.messenger.on(`element.patch.${id}`, values => {
                this.documentStore.updateDocument(document => {
                    const elementBindings = document.bindings[id] ?? observable({});

                    Object.keys(values || {}).forEach(key => {
                        const bindings = elementBindings[key] ?? [];

                        const newBindings = bindings.filter(binding => binding.type !== "static");
                        newBindings.push({
                            type: "static",
                            value: values[key]
                        });

                        elementBindings[key] = newBindings;
                    });

                    document.bindings[id] = elementBindings;
                });
            })
        );
    }
}
