"use client";
import React, { useContext, useMemo } from "react";
import { DocumentStore } from "~/sdk";
import { documentStoreManager } from "~/sdk/DocumentStoreManager";

const DocumentStoreContext = React.createContext<DocumentStore | undefined>(undefined);

export const DocumentStoreProvider = ({
    id,
    children
}: {
    id: string;
    children: React.ReactNode;
}) => {
    const store = useMemo(() => documentStoreManager.getStore(id), [id]);

    return <DocumentStoreContext.Provider value={store}>{children}</DocumentStoreContext.Provider>;
};

export const useDocumentStore = (): DocumentStore => {
    const store = useContext(DocumentStoreContext);
    if (!store) {
        throw new Error("useDocumentStore must be used within a DocumentStoreProvider");
    }
    return store;
};
