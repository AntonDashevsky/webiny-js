import React from "react";
import { SearchBlocks } from "./SearchBlocks.js";
import { useBlocksBrowser } from "./useBlocksBrowser.js";

export const BlocksBrowser = () => {
    const { isOpen, closeBrowser } = useBlocksBrowser();

    return isOpen ? <SearchBlocks onClose={closeBrowser} /> : null;
};
