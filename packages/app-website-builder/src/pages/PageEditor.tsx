import React from "react";
import mockPage1 from "~/DocumentEditor/mocks/mockPage1";
import emptyPage from "~/DocumentEditor/mocks/emptyPage";
import { DocumentEditor } from "~/DocumentEditor/DocumentEditor.js";
import { EditorStateDebugger } from "./EditorStateDebugger";
import { CompositionScope } from "@webiny/app-admin";

export const PageEditor = () => {
    return (
        <CompositionScope name={"websiteBuilder"}>
            <DocumentEditor document={emptyPage}>
                {/*<EditorConfig>
                <EditorConfig.Ui.Content.Element
                    name={"debugger"}
                    element={<EditorStateDebugger />}
                />
            </EditorConfig>*/}
            </DocumentEditor>
        </CompositionScope>
    );
};
