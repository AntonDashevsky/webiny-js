import React, { useMemo } from "react";
import type { EditorDocument } from "@webiny/website-builder-sdk";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Editor as EditorComponent } from "~/BaseEditor/components/index.js";
import { Editor } from "~/editorSdk/Editor.js";
import { observer } from "mobx-react-lite";
import { StateInspector } from "./StateInspector.js";
import { CompositionScope } from "@webiny/react-composition";
import { DialogsProvider } from "@webiny/app-admin";

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
        <DialogsProvider>
            <DndProvider backend={HTML5Backend}>
                <StateInspector editor={editor} />
                <DocumentEditorContext.Provider value={editor as Editor<TDocument>}>
                    {children ? <>{children}</> : null}
                    <CompositionScope name={name}>
                        <EditorComponent />
                    </CompositionScope>
                </DocumentEditorContext.Provider>
            </DndProvider>
        </DialogsProvider>
    );
}

const WithObserver = observer(BaseDocumentEditor);

export const DocumentEditor = WithObserver;
