import React from "react";
import { type Component, contentSdk, type Document } from "@webiny/website-builder-sdk";
import { ElementRenderer } from "./ElementRenderer";
import { DocumentStoreProvider } from "./DocumentStoreProvider";
import { ConnectToEditor } from "./ConnectToEditor";
import { editorComponents } from "../editorComponents/index";
import type { DocumentFragments } from "./FragmentsProvider";
import { FragmentsProvider } from "./FragmentsProvider";

interface DocumentRendererProps {
    document: Document | null;
    components: Component[];
    children?: React.ReactNode | React.ReactNode[];
}

export const DocumentRenderer = ({ document, components, children }: DocumentRendererProps) => {
    const allComponents = [...editorComponents, ...components];
    allComponents.forEach(blueprint => contentSdk.registerComponent(blueprint));
    const fragments: DocumentFragments = {};

    React.Children.toArray(children).forEach(child => {
        // @ts-expect-error Need to properly type this.
        const { name, children } = child.props;
        if (!name || !children) {
            return;
        }

        fragments[name] = <>{children}</>;
    });

    if (!document) {
        return <div data-role={"document-renderer"}>{children}</div>;
    }

    return (
        <div data-role={"document-renderer"}>
            <FragmentsProvider fragments={fragments ?? {}}>
                {contentSdk.isEditing() ? (
                    <ConnectToEditor document={document} components={components} />
                ) : (
                    <DocumentStoreProvider id={document.properties.id} document={document}>
                        <ElementRenderer id={"root"} />
                    </DocumentStoreProvider>
                )}
            </FragmentsProvider>
        </div>
    );
};
