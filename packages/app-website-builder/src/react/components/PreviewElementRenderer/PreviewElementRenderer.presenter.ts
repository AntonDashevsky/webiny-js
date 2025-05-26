import set from "lodash/set";
import { autorun, makeAutoObservable, observable, runInAction, toJS } from "mobx";
import { documentStore, contentSdk, type PreviewSdk } from "~/sdk/index.js";
import type { DocumentElement } from "~/sdk/types.js";

export class PreviewElementRendererPresenter {
    private element: DocumentElement | null;
    private listeners: Array<() => void> = [];
    private preview: PreviewSdk;

    constructor() {
        this.element = {} as DocumentElement;
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

    dispose() {
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
                const newData = documentStore.getElement(id);
                runInAction(() => {
                    this.element = newData;
                });
            })
        );

        this.listeners.push(
            this.preview.messenger.on(`element.patch.${id}`, values => {
                const element = this.element;
                if (!element) {
                    return;
                }

                const newData = toJS(element);
                Object.keys(values).forEach(key => {
                    set(newData, key, values[key]);
                });

                runInAction(() => {
                    this.element = observable(newData);
                });
            })
        );
    }
}
