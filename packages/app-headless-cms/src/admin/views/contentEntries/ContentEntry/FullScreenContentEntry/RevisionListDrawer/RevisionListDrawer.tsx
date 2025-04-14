import React from "react";
// @ts-expect-error
import { useHotkeys } from "react-hotkeyz";
import { RevisionsList } from "~/admin/views/contentEntries/ContentEntry/RevisionsList/RevisionsList";
import { cmsLegacyEntryEditor } from "~/utils/cmsLegacyEntryEditor";
import { useFullScreenContentEntry } from "../useFullScreenContentEntry";
import { Drawer } from "@webiny/admin-ui";

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
        <Drawer
            title={"Entry revisions"}
            open={isRevisionListOpen}
            onOpenChange={open => openRevisionList(open)}
            modal
            bodyPadding={false}
            headerSeparator={true}
            width={1000}
        >
            <RevisionsList />
        </Drawer>
    );
};
