"use client";
import React, { useContext, useEffect, useMemo } from "react";
import type { Document } from "~/sdk/types";
import { documentStoreManager } from "~/sdk/DocumentStoreManager";
import { DocumentStore } from "~/sdk";

const DocumentStoreContext = React.createContext<DocumentStore | undefined>(undefined);

export const DocumentStoreProvider = ({
    id,
    document,
    children
}: {
    id: string;
    document?: Document;
    children: React.ReactNode;
}) => {
    const store = useMemo(() => documentStoreManager.getStore(id), [id]);

    useEffect(() => {
        if (document) {
            store.setDocument(document);
        }
    }, [document]);

    return <DocumentStoreContext.Provider value={store}>{children}</DocumentStoreContext.Provider>;
};

export const useDocumentStore = (): DocumentStore => {
    const store = useContext(DocumentStoreContext);
    if (!store) {
        throw new Error("useDocumentStore must be used within a DocumentStoreProvider");
    }
    return store;
};
