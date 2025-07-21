"use client";
import React, { useEffect, useState } from "react";
import { contentSdk, type Component, type Document } from "@webiny/website-builder-sdk";
import { DocumentStoreProvider } from "~/components/DocumentStoreProvider";
import { ElementRenderer } from "~/components/ElementRenderer";

interface ConnectToEditorProps {
    document: Document;
    components: Component[];
}

export const ConnectToEditor = (props: ConnectToEditorProps) => {
    const [data, setData] = useState<Document | null>(null);

    useEffect(() => {
        contentSdk.getPage(props.document.properties.path).then(document => {
            setData(document);
        });
    }, []);

    if (!data) {
        return null;
    }

    return (
        <DocumentStoreProvider id={data.properties.id} document={data}>
            <ElementRenderer id={"root"} />
        </DocumentStoreProvider>
    );
};
