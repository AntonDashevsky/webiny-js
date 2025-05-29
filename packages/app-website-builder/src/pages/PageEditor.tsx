import React from "react";
import mockPage1 from "~/DocumentEditor/mocks/mockPage1";
import emptyPage from "~/DocumentEditor/mocks/emptyPage";
import { DocumentEditor } from "~/DocumentEditor/DocumentEditor.js";
import { EditorStateDebugger } from "./EditorStateDebugger";

export const PageEditor = () => {
    return (
        <DocumentEditor document={emptyPage}>
            {/*<EditorConfig>
                <EditorConfig.Ui.Content.Element
                    name={"debugger"}
                    element={<EditorStateDebugger />}
                />
            </EditorConfig>*/}
        </DocumentEditor>
    );
};
