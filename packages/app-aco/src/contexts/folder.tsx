import React, { createContext } from "react";
import type { FolderItem } from "~/types.js";

export interface FolderContext {
    folder: FolderItem;
}

export const FolderContext = createContext<FolderContext | undefined>(undefined);

interface FolderProviderProps {
    folder: FolderItem | undefined;
    children: React.ReactNode;
}

export const FolderProvider = ({ folder, children }: FolderProviderProps) => {
    if (!folder) {
        return null;
    }

    const value: FolderContext = { folder };

    return <FolderContext.Provider value={value}>{children}</FolderContext.Provider>;
};
