import React, { useMemo } from "react";
import type { EditorDocument } from "~/sdk/types.js";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Editor as EditorComponent } from "~/BaseEditor/components";
import { Editor } from "~/editorSdk/Editor";
import { observer } from "mobx-react-lite";
import { StateInspector } from "./StateInspector";
import { CompositionScope } from "@webiny/react-composition";

export const DocumentEditorContext = React.createContext<Editor<any> | undefined>(undefined);

export function useDocumentEditor<TDocument extends EditorDocument>() {
    const context = React.useContext(DocumentEditorContext);
    if (!context) {
        throw new Error("useDocumentEditor must be used within a <DocumentEditor /> context!");
    }
    return context as Editor<TDocument>;
}

interface DocumentEditorProps<TDocument> {
    document: TDocument;
    name: string;
    children?: React.ReactNode;
}

function BaseDocumentEditor<TDocument extends EditorDocument>({
    document,
    name,
    children
}: DocumentEditorProps<TDocument>) {
    const editor = useMemo(() => new Editor<TDocument>(document), [document]);

    return (
        <DndProvider backend={HTML5Backend}>
            <StateInspector editor={editor} />
            <DocumentEditorContext.Provider value={editor as Editor<TDocument>}>
                {children ? <>{children}</> : null}
                <CompositionScope name={name}>
                    <EditorComponent />
                </CompositionScope>
            </DocumentEditorContext.Provider>
        </DndProvider>
    );
}

const WithObserver = observer(BaseDocumentEditor);

export const DocumentEditor = WithObserver;
