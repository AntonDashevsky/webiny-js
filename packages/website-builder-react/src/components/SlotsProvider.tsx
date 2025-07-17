"use client";
import React, { useEffect } from "react";
import { contentSdk } from "@webiny/app-website-builder/sdk";

type Slots = Record<string, React.ReactNode>;

const SlotsContext = React.createContext<Slots | undefined>(undefined);

interface SlotsProviderProps {
    slots: Slots;
    children: React.ReactNode;
}

export const SlotsProvider = ({ slots, children }: SlotsProviderProps) => {
    const slotNames = Object.keys(slots);

    useEffect(() => {
        if (contentSdk.isEditing()) {
            contentSdk.getEditingSdk()!.messenger.send("document.slots", { slots: slotNames });
        }
    }, [slotNames]);

    return <SlotsContext.Provider value={slots}>{children}</SlotsContext.Provider>;
};

export const useDocumentSlots = () => {
    const context = React.useContext(SlotsContext);
    if (!context) {
        return {};
    }

    return context;
};
