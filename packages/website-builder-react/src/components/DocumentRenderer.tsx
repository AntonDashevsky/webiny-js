import React from "react";
import { type Component, contentSdk, type Document } from "@webiny/app-website-builder/sdk";
import { ElementRenderer } from "./ElementRenderer";
import { DocumentStoreProvider } from "./DocumentStoreProvider";
import { ConnectToEditor } from "./ConnectToEditor";
import { editorComponents } from "../editorComponents/index";
import { SlotsProvider } from "./SlotsProvider";

interface DocumentRendererProps {
    document: Document;
    components: Component[];
    slots?: { [key: string]: React.ReactNode };
}

export const DocumentRenderer = ({ document, components, slots }: DocumentRendererProps) => {
    const allComponents = [...editorComponents, ...components];
    allComponents.forEach(blueprint => contentSdk.registerComponent(blueprint));

    return (
        <div data-role={"document-renderer"}>
            <SlotsProvider slots={slots ?? {}}>
                {contentSdk.isEditing() ? (
                    <ConnectToEditor document={document} components={components} />
                ) : (
                    <DocumentStoreProvider id={document.properties.id} document={document}>
                        <ElementRenderer id={"root"} />
                    </DocumentStoreProvider>
                )}
            </SlotsProvider>
        </div>
    );
};
