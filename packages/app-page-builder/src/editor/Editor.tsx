import React, { useCallback } from "react";
import { RecoilRoot, type MutableSnapshot } from "recoil";
import { Editor as EditorComponent } from "./components/Editor/index.js";
import { EditorConfigApply } from "./components/Editor/EditorConfig.js";
import { EditorProvider } from "./contexts/EditorProvider.js";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { elementsAtom, rootElementAtom } from "~/editor/recoil/modules/index.js";
import { flattenElements } from "~/editor/helpers.js";
import { EditorWithConfig } from "~/editor/config/index.js";
import { type PbEditorElementTree } from "~/types.js";

export interface EditorStateInitializerFactory {
    (): EditorStateInitializer;
}

export interface EditorStateInitializer {
    content: PbEditorElementTree;
    recoilInitializer: (mutableSnapshot: MutableSnapshot) => void;
}

export interface EditorProps {
    stateInitializerFactory: EditorStateInitializerFactory;
}

export const Editor = ({ stateInitializerFactory }: EditorProps) => {
    const initializeState = useCallback(
        (snapshot: MutableSnapshot) => {
            const { content, recoilInitializer } = stateInitializerFactory();

            /* Here we initialize elementsAtom and rootElement if it exists. */
            snapshot.set(rootElementAtom, content.id || "");

            const elements = flattenElements(content);
            Object.keys(elements).forEach(key => {
                snapshot.set(elementsAtom(key), elements[key]);
            });

            recoilInitializer(snapshot);
        },
        [stateInitializerFactory]
    );

    return (
        <DndProvider backend={HTML5Backend}>
            <RecoilRoot initializeState={initializeState}>
                <EditorProvider>
                    <EditorConfigApply />
                    <EditorWithConfig>
                        <EditorComponent />
                    </EditorWithConfig>
                </EditorProvider>
            </RecoilRoot>
        </DndProvider>
    );
};
