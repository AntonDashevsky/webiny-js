import React from "react";
// @ts-expect-error
import { useHotkeys } from "react-hotkeyz";
import { DrawerContent } from "@webiny/ui/Drawer/index.js";
import { RevisionsList } from "~/admin/views/contentEntries/ContentEntry/RevisionsList/RevisionsList.js";
import { cmsLegacyEntryEditor } from "~/utils/cmsLegacyEntryEditor.js";
import { useFullScreenContentEntry } from "../useFullScreenContentEntry.js";
import { Header } from "./Header.js";
import { Drawer } from "./RevisionListDrawer.styled.js";

export const RevisionListDrawer = () => {
    const { isRevisionListOpen, openRevisionList } = useFullScreenContentEntry();

    if (cmsLegacyEntryEditor) {
        return null;
    }

    useHotkeys({
        zIndex: 55,
        disabled: !isRevisionListOpen,
        keys: {
            esc: () => openRevisionList(false)
        }
    });

    return (
        <Drawer open={isRevisionListOpen} onClose={() => openRevisionList(false)} modal dismissible>
            <DrawerContent>
                <Header onClose={() => openRevisionList(false)} />
                <RevisionsList />
            </DrawerContent>
        </Drawer>
    );
};
