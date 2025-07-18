"use client";
import React, { useEffect } from "react";
import { contentSdk } from "@webiny/app-website-builder/sdk";

export type DocumentFragments = Record<string, React.ReactNode>;

const FragmentsContext = React.createContext<DocumentFragments | undefined>(undefined);

interface FragmentsProviderProps {
    fragments: DocumentFragments;
    children: React.ReactNode;
}

export const FragmentsProvider = ({ fragments, children }: FragmentsProviderProps) => {
    const fragmentNames = Object.keys(fragments);

    useEffect(() => {
        if (contentSdk.isEditing()) {
            contentSdk
                .getEditingSdk()!
                .messenger.send("document.fragments", { fragments: fragmentNames });
        }
    }, [fragmentNames]);

    return <FragmentsContext.Provider value={fragments}>{children}</FragmentsContext.Provider>;
};

export const useDocumentFragments = () => {
    const context = React.useContext(FragmentsContext);
    if (!context) {
        return {};
    }

    return context;
};
