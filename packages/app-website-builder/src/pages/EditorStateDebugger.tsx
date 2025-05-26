import { useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import styled from "@emotion/styled";
import { Button } from "@webiny/admin-ui";
import { useDocumentEditor } from "~/DocumentEditor";
import { useSelectFromDocument } from "~/BaseEditor/hooks/useSelectFromDocument";
import React from "react";
import { useSelectFromEditor } from "~/BaseEditor/hooks/useSelectFromEditor";
import type { HistorySnapshot } from "~/editorSdk/HistorySnapshot";
import { ElementsButton } from "~/pages/debugger/ElementsButton";

const Toolbar = styled.div`
    position: absolute;
    padding-top: 5px;
    width: 100%;
    padding-left: 5px;
    border-top: 1px solid #cccccc;
    z-index: 10000;
`;

const monacoOptions = { minimap: { enabled: false } };

const formatSnapshots = (snapshots: HistorySnapshot[], activeIndex: number) => {
    return snapshots
        .map((snapshot, index) => {
            const asString = JSON.stringify(snapshot.getState(), null, 2);
            const isActive = activeIndex === index;

            return `// ${isActive ? "🟢" : "⚪️"} Snapshot #${index + 1} (${snapshot
                .getCreatedOn()
                .toISOString()})\n${asString}`;
        })
        .join(",\n");
};

export const EditorStateDebugger = () => {
    const editor = useDocumentEditor();

    const editorState = useSelectFromEditor(state => state);
    const documentState = useSelectFromDocument(state => state);
    const history = editor.getDocumentState().getHistory();

    const numberOfSnapshots = editor.getDocumentState().getHistory().getSnapshots().length;

    useEffect(() => {
        // @ts-ignore 123
        window["editor"] = editor;
    }, []);

    const monacoValue = `// Editor State\n${JSON.stringify(
        editorState,
        null,
        2
    )}\n\n// Document State\n${JSON.stringify(
        documentState,
        null,
        2
    )}\n\n// History\n\n${formatSnapshots(history.getSnapshots(), history.getActiveSnapshotIndex())}
    \n// Snapshot Changes\n${JSON.stringify(history.getCurrentSnapshot().getChanges(), null, 2)}`;

    return (
        <Toolbar>
            <ElementsButton />
            <Button variant="secondary" text={`Snapshots: ${numberOfSnapshots}`}></Button>
            <MonacoEditor
                height={"100vh"}
                language={"json"}
                value={monacoValue}
                options={monacoOptions}
            />
        </Toolbar>
    );
};
