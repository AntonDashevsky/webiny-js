import React, { useMemo } from "react";
import type { Document } from "~/sdk/types.js";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Editor as EditorComponent } from "~/BaseEditor/components";
import { Editor } from "~/editorSdk/Editor";
import { observer } from "mobx-react-lite";
import { StateInspector } from "./StateInspector";
import { CompositionScope } from "@webiny/react-composition";

export const DocumentEditorContext = React.createContext<Editor | undefined>(undefined);

export const useDocumentEditor = () => {
    const context = React.useContext(DocumentEditorContext);
    if (!context) {
        throw new Error("useDocumentEditor must be used within a <DocumentEditor /> context!");
    }
    return context;
};

interface DocumentEditorProps {
    document: Document;
    name: string;
    children?: React.ReactNode;
}

export const DocumentEditor = observer(({ document, name, children }: DocumentEditorProps) => {
    const editor = useMemo(() => new Editor(document), [document]);

    return (
        <DndProvider backend={HTML5Backend}>
            <StateInspector editor={editor} />
            <DocumentEditorContext.Provider value={editor}>
                {children ? <>{children}</> : null}
                <CompositionScope name={name}>
                    <EditorComponent />
                </CompositionScope>
            </DocumentEditorContext.Provider>
        </DndProvider>
    );
});
