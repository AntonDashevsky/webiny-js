import React, { useCallback, useEffect, useMemo } from "react";
import { Messenger } from "~/sdk/messenger";
import { useDocumentEditor } from "~/DocumentEditor";
import { AddressBar } from "./AddressBar";
import { Iframe } from "./Iframe";
import type {
    ComponentManifest,
    EditorViewportInfo,
    BoxesData,
    PreviewViewportData,
    SerializedComponentGroup
} from "~/sdk/types";
import { mousePositionTracker } from "./MousePositionTracker";
import { HoverManager } from "./HoverManager";
import { DropZoneManager } from "./DropZoneManager";
import { DropZoneManagerProvider } from "./DropZoneManagerProvider";
import { MouseStatus } from "~/BaseEditor/defaultConfig/Content/Preview/MouseStatus";
import { Boxes } from "~/BaseEditor/hooks/Boxes";
import { ScrollTracker } from "~/BaseEditor/defaultConfig/Content/Preview/ScrollTracker";
import { KeyboardShortcuts } from "./KeyboardShortcuts";

export const Preview = () => {
    const editor = useDocumentEditor();

    const getIframeBox = useCallback(() => {
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
    }, []);

    const mapCoordinatesToEditorSpace = useCallback(
        (viewport: EditorViewportInfo, boxes: PreviewViewportData["boxes"]) => {
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
        },
        [getIframeBox]
    );

    const hoverManager = useMemo(() => {
        return new HoverManager(mousePositionTracker, () => {
            const editorState = editor.getEditorState().read();
            return new Boxes(editorState.boxes.editor).filter(box => box.id !== "root");
        });
    }, [mousePositionTracker]);

    const scrollTracker = useMemo(() => {
        return new ScrollTracker(window, e => {
            const source = e.target as HTMLDivElement | null;

            if (!source) {
                return false;
            }

            return source.dataset.role === "element-overlay";
        });
    }, []);

    const dropzoneManager = useMemo(() => {
        return new DropZoneManager(mousePositionTracker);
    }, [mousePositionTracker]);

    // Start various trackers
    useEffect(() => {
        mousePositionTracker.start();
        scrollTracker.start();
        dropzoneManager.start();

        return () => {
            dropzoneManager.stop();
            mousePositionTracker.stop();
            scrollTracker.stop();
        };
    }, [dropzoneManager, scrollTracker, mousePositionTracker]);

    // Update mouse position while dragging
    useEffect(() => {
        const setMousePositionFromDrag = (e: DragEvent) => {
            mousePositionTracker.setPosition(e.clientX, e.clientY);
        };

        window.addEventListener("dragover", setMousePositionFromDrag);

        const offHoverChange = hoverManager.onHoverChange(id => {
            editor.updateEditor(state => {
                state.highlightedElement = id;
            });
        });

        return () => {
            window.removeEventListener("dragover", setMousePositionFromDrag);
            offHoverChange();
        };
    }, []);

    const onConnected = useCallback((messenger: Messenger) => {
        messenger.send("document.set", editor.getDocumentState().read());

        messenger.on("preview.viewport.change.start", () => {
            editor.updateEditor(state => {
                state.showOverlays = false;
            });
        });

        messenger.on("preview.viewport", ({ boxes, viewport }: PreviewViewportData) => {
            const iframeBox = getIframeBox();

            editor.updateEditor(state => {
                state.viewport = {
                    ...viewport,
                    top: iframeBox.top,
                    left: iframeBox.left
                };

                state.boxes = {
                    preview: boxes,
                    editor: mapCoordinatesToEditorSpace(state.viewport, boxes)
                };
                state.showOverlays = true;
            });
        });

        messenger.on("preview.component.register", (component: ComponentManifest) => {
            editor.updateEditor(state => {
                if (!state.components) {
                    state.components = {};
                }
                state.components[component.name] = component;
            });
        });

        messenger.on("preview.componentGroup.register", (group: SerializedComponentGroup) => {
            editor.updateEditor(state => {
                if (!state.componentGroups) {
                    state.componentGroups = {};
                }
                state.componentGroups[group.name] = group;
            });
        });

        messenger.on("preview.element.click", ({ id }) => {
            editor.updateEditor(state => {
                state.selectedElement = id;
            });
        });

        messenger.on("preview.mouse.move", ({ x, y }) => {
            const iframeBox = getIframeBox();
            const globalX = x + iframeBox.left;
            const globalY = y + iframeBox.top;

            mousePositionTracker.setPosition(globalX, globalY);
        });

        messenger.on("preview.element.enter", ({ id }) => {
            if (id === "root") {
                return;
            }

            editor.updateEditor(state => {
                state.highlightedElement = id;
            });
        });

        editor.onDocumentStateChange(event => {
            if (event.reason === "update") {
                messenger.send("document.patch", event.diff);
            } else {
                messenger.send("document.set", event.state);
            }
        });

        // Scroll wheel
        scrollTracker.onChange(event => {
            messenger.send("preview.scroll", {
                deltaX: event.deltaX,
                deltaY: event.deltaY
            });
        });
    }, []);

    return (
        <>
            <DropZoneManagerProvider dropzoneManager={dropzoneManager}>
                <AddressBar />
                <Iframe onConnected={onConnected} />
            </DropZoneManagerProvider>
            <MouseStatus />
            <KeyboardShortcuts />
        </>
    );
};
