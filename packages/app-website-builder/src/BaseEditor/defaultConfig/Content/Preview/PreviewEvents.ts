import { Editor } from "~/editorSdk/Editor";
import {
    type BoxesData,
    type ComponentManifest,
    type EditorViewportInfo,
    Messenger,
    mouseTracker,
    type PreviewViewportData,
    type SerializedComponentGroup
} from "@webiny/website-builder-sdk";
import defaultImage from "@webiny/icons/extension.svg";
import { Commands } from "~/BaseEditor";
import { $createElement } from "~/editorSdk/utils";
import { ScrollTracker } from "./ScrollTracker";

export class PreviewEvents {
    private editor: Editor;
    private editorEventsRegistered = false;
    private messenger: Messenger | undefined;
    private scrollTracker: ScrollTracker;
    private listeners: Array<() => void> = [];

    constructor(editor: Editor, scrollTracker: ScrollTracker) {
        this.scrollTracker = scrollTracker;
        this.editor = editor;
    }

    onConnected(messenger: Messenger) {
        // Dispose of the old messenger.
        this.messenger?.dispose();

        this.messenger = messenger;

        this.registerEditorEvents();

        this.subscribeToIframe(messenger);

        setTimeout(() => {
            this.editor.updateEditor(state => {
                state.loadingPreview = false;
            });
        }, 100);
    }

    destroy() {
        this.listeners.forEach(unsubscribe => {
            unsubscribe();
        });
    }

    private registerEditorEvents() {
        if (this.editorEventsRegistered) {
            return;
        }

        this.editorEventsRegistered = true;

        this.listeners.push(
            // Propagate changes
            this.editor.onDocumentStateChange(event => {
                if (event.reason === "update") {
                    this.getMessenger().send("document.patch", event.diff);
                } else {
                    this.getMessenger().send("document.set", event.state);
                }
            }),
            // Scroll wheel
            this.scrollTracker.onChange(event => {
                this.getMessenger().send("preview.scroll", {
                    deltaX: event.deltaX,
                    deltaY: event.deltaY
                });
            }),
            // Element preview
            this.editor.registerCommandHandler(Commands.PreviewPatchElement, payload => {
                this.getMessenger().send(`element.patch.${payload.elementId}`, payload.patch);
            })
        );
    }

    private subscribeToIframe(messenger: Messenger) {
        // When `onConnected` is executed, we need to send new data to the live preview.
        messenger.send("document.set", this.editor.getDocumentState().toJson());

        messenger.on("preview.viewport.change.start", () => {
            this.editor.updateEditor(state => {
                state.showOverlays = false;
            });
        });

        messenger.on("preview.theme", ({ theme }) => {
            this.editor.executeCommand(Commands.SetTheme, { theme });
        });

        messenger.on("document.fragments", payload => {
            const fragments: string[] = payload.fragments;
            this.editor.updateEditor(state => {
                state.fragments = fragments;
            });

            const document = this.editor.getDocumentState().read();

            if (Object.keys(document.elements).length === 1) {
                // We only have the default "root" element, create fragment elements.
                let index = 0;
                fragments.forEach(fragment => {
                    $createElement(this.editor, {
                        componentName: "Webiny/Fragment",
                        parentId: "root",
                        slot: "children",
                        index,
                        bindings: {
                            inputs: {
                                name: fragment
                            }
                        }
                    });
                    index++;
                });
            }
        });

        messenger.on("preview.viewport", ({ boxes, viewport }: PreviewViewportData) => {
            const iframeBox = this.getIframeBox();

            this.editor.updateEditor(state => {
                state.viewport = {
                    ...viewport,
                    top: iframeBox.top,
                    left: iframeBox.left
                };

                state.boxes = {
                    preview: boxes,
                    editor: this.mapCoordinatesToEditorSpace(state.viewport, boxes)
                };
                state.showOverlays = true;
            });
        });

        messenger.on("preview.component.register", (component: ComponentManifest) => {
            this.editor.updateEditor(state => {
                if (!state.components) {
                    state.components = {};
                }
                state.components[component.name] = {
                    ...component,
                    image: component.image ?? defaultImage
                };
            });
        });

        messenger.on("preview.componentGroup.register", (group: SerializedComponentGroup) => {
            this.editor.updateEditor(state => {
                if (!state.componentGroups) {
                    state.componentGroups = {};
                }
                state.componentGroups[group.name] = group;
            });
        });

        messenger.on("preview.element.click", ({ id }) => {
            this.editor.updateEditor(state => {
                state.selectedElement = id;
            });
        });

        messenger.on("preview.mouse.move", ({ x, y }) => {
            const iframeBox = this.getIframeBox();
            const globalX = x + iframeBox.left;
            const globalY = y + iframeBox.top;

            mouseTracker.setPosition(globalX, globalY);
        });
    }

    private getIframeBox() {
        const iframe = document.getElementById("preview-iframe");
        if (!iframe) {
            return {
                top: 0,
                left: 0,
                width: 0,
                height: 0
            };
        }

        const iframeRect = iframe.getBoundingClientRect();

        return {
            top: iframeRect.top,
            left: iframeRect.left,
            width: iframeRect.width,
            height: iframeRect.height
        };
    }

    private mapCoordinatesToEditorSpace(
        viewport: EditorViewportInfo,
        boxes: PreviewViewportData["boxes"]
    ) {
        const newBoxes: BoxesData = {};

        for (const key in boxes) {
            const box = boxes[key];
            newBoxes[key] = {
                ...box,
                top: box.top + viewport.top,
                left: box.left + viewport.left
            };
        }

        return newBoxes;
    }

    private getMessenger(): Messenger {
        return this.messenger!;
    }
}
