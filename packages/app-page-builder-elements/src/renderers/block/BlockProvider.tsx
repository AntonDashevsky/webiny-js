import React from "react";
import { type Element } from "~/types.js";
import { makeDecoratable } from "@webiny/react-composition";

interface BlockProviderProps {
    block: Element | null;
    children: React.ReactNode;
}

const BlockContext = React.createContext<Element | null>(null);

export const BlockProvider = ({ block, children }: BlockProviderProps) => {
    return <BlockContext.Provider value={block}>{children}</BlockContext.Provider>;
};

export const useParentBlock = makeDecoratable(() => {
    const context = React.useContext(BlockContext);

    if (context === undefined) {
        throw new Error(`<BlockProvider> is missing in the component hierarchy!`);
    }

    return context;
});
