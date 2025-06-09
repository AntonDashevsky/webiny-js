import React from "react";
import { useRecoilValue } from "recoil";
import { BlockProvider } from "@webiny/app-page-builder-elements/renderers/block/BlockProvider.js";
import { type Element } from "@webiny/app-page-builder-elements/types.js";
import { blockByElementSelector } from "~/editor/hooks/useCurrentBlockElement.js";
import { useActiveElementId } from "~/editor/hooks/useActiveElementId.js";

export const CurrentBlockProvider = ({ children }: { children: React.ReactNode }) => {
    const [activeElementId] = useActiveElementId();
    const editorBlock = useRecoilValue(blockByElementSelector(activeElementId || undefined));

    const block = editorBlock ? (editorBlock as Element) : null;

    return <BlockProvider block={block}>{children}</BlockProvider>;
};
