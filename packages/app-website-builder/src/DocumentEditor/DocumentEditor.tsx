import React, { useMemo } from "react";
import type { Document } from "~/sdk/types.js";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Editor as EditorComponent } from "~/BaseEditor/components";
import { DefaultEditorConfig } from "~/BaseEditor";
import { Editor } from "~/editorSdk/Editor";
import { StateInspector } from "@webiny/app-admin/components";
import { observer } from "mobx-react-lite";

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
    children?: React.ReactNode;
}

export const DocumentEditor = observer(({ document, children }: DocumentEditorProps) => {
    const editor = useMemo(() => new Editor(document), []);
    const state = {
        editorState: editor.getEditorState().toJson(),
        documentState: editor.getDocumentState().toJson()
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <DefaultEditorConfig />
            <StateInspector title={"Editor State"} shortcut={"Cmd+E"} state={state} />
            <DocumentEditorContext.Provider value={editor}>
                {children ? <>{children}</> : null}
                <EditorComponent />
            </DocumentEditorContext.Provider>
        </DndProvider>
    );
});
